import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Map from './view/Map'
import Straight from './view/Straight'
import Plotly from 'plotly.js'
import *as d3 from "d3";
import MulLine from "./view/MulLine"
// import Matrix from "./view/matrix";
// import Other from "./view/other";
// import Other1 from "./view/other1";
// import Other2 from "./view/other2";
// import Other3 from "./view/other3";
import Com_PH from './view/Bottom/Com_PH';
import Com_N2 from "./view/Bottom/Com_N2";
import Com_Oxy from "./view/Bottom/Com_Oxy";
import Com_Level from "./view/Bottom/Com_Level";
import Pie from "./view/Pie";
class App extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.getPHData = this.getPHData.bind(this);
        this.turnLevel = this.turnLevel.bind(this);
        this.getPointData = this.getPointData.bind(this);
        this.getData2ToData1 = this.getData2ToData1.bind(this);
        this.getLineLevel = this.getLineLevel.bind(this);
        this.getTmpFilter = this.getTmpFilter.bind(this);
        this.callback = this.callback.bind(this);
        this.getPieData = this.getPieData.bind(this);
        this.getMulLine = this.getMulLine.bind(this);
        this.getFilterData = this.getFilterData.bind(this);
    }
    componentDidMount() {
        const readData = function (fileName) {
            return new Promise(function (resolve,reject) {
                Plotly.d3.csv(fileName,function (err,data) {
                    if(err) return reject(err);
                    resolve(data)
                })
            })
        };

        //定义组件数据
        let Line = {};
        let LineName = [];
        let LineNameCpy = [];
        let tmpData1 = [];
        let tmpData2 = [];
        let pieData = {};
        let mulLineData = {};
        (async ()=>{
            //给data1 data2 赋值 并给组件数据赋值。
            let data1 = await readData("point.csv");
            let data2 = await readData("detail.csv");
                tmpData1 = data1;
            let color = "red";
            tmpData2 = this.getPointData(tmpData1,"长江",color);
            console.log("过滤的data");
            //让data2的值给data1
           data1 = this.getData2ToData1(data2,data1);
            /*
            * 统计流域以及其总数*/
            data1.forEach((item,index)=>{
                if(Line[item["basin"]]===undefined) {
                    Line[item["basin"]] = 1;
                }else{
                    Line[item["basin"]]+=1;
                }
            });
            Line["其他流域"] = 0;
            for (let i in Line) {
                if(Line[i]<=5){
                    Line["其他流域"] +=Line[i];
                    delete Line[i];
                }else {
                    LineName.push(i);
                }
            }
            LineNameCpy = LineName;
            LineName = this.getLineLevel(data1,LineName);
            console.log(LineName);
            pieData=this.getPieData(LineName[0]);
            mulLineData = this.getMulLine(this.getFilterData(data1,'长江'),'长江');
        })().then(()=>{
            // console.log(this);
            this.setState ({
                tmpData1,
                Line,
                LineNameCpy,
                LineName,
                tmpData2,
                pieData,
                mulLineData
            });
        });
    }
    getFilterData(data1,msg) {
        let tmpData1 = data1.filter((item,index)=>{
            return item["basin"]===msg
        });
        return tmpData1
    }
     getTmpFilter(data){
         let tmp = [];
         let filterData1 = data.filter((item,index) => {
             item["sta_time"] = item["sta_time"].split(" ");
             let reg = /^(\d\d\d\d-\d\d-)0*/;
             item["sta_time"][0] = item["sta_time"][0].replace(reg,"");
             item["date"] = parseInt(item["sta_time"][0]);
             let tmpName = item["sta_time"][0].replace(reg,"");
             // console.log(tmpName);
             if(tmp.indexOf(tmpName) ===-1) {
                 tmp.push(tmpName);
                 return true;
             }
             // console.log(item["sta_time"][0])
             return false;
         });
         let tmpFilter = [];
         filterData1.forEach((item,index) => {
             tmpFilter[item["date"]] = item;
         });
         for(let i=1;i<=31;i++) {
             if (!tmpFilter[i]){
                 tmpFilter[i]=tmpFilter[i-1]
             }
         }
         // {
         //     name:'邮件营销',
         //         type:'line',
         //     stack: '总量',
         //     data:[120, 132, 101, 134, 90, 230, 210]
         // },
         tmpFilter.splice(0,1);
         console.log(tmpFilter);
         return tmpFilter;
     }
     getPHData(tmpFilter,name,In,kind){
         let tmpPHSeries ;
         let sum=0;
         let tmpPHdata = tmpFilter.map((item,index) => {
             sum+=parseInt(item[In]);
             return parseInt(item[In]);
         });
         let sum_aver;
         if(kind ==='Level') {
             sum_aver = parseInt((sum/31).toFixed(2))
         }else {
             sum_aver = parseFloat((sum/31).toFixed(2))
         }
         tmpPHSeries = {
             name:name,
             type:'line',
             stack:kind,
             data:tmpPHdata,
             sum_aver:sum_aver,
         };
         console.log(tmpPHSeries);
         return tmpPHSeries;
    }
     getPointData(tmpData1,name,color){
         tmpData1 = tmpData1.map((item,index) => {
             if(item["description"]==="\\N"){
                 item["description"] ="无";
             }
             return{name: item["name"] ,
                 log:Number(item["lon"]),
                 lat: Number(item["lat"]),
                 basin: item['basin'],
                 detail:item["description"]}
         });
         tmpData1 =  tmpData1.filter((item,index) => {
             // return item['text'][1]===name
             if(item["lat"]>90){
              return false;
             }
             return item['basin'] === name;
         });
         console.log("地图在哪");
         console.log(tmpData1);
         return tmpData1;
     }
     getData2ToData1(data2,data1){
         data1.forEach((item,index)=>{
             let tmpArray1 = [];
             data2.forEach((item2,index2) => {
                 if(item2['sta_id']===item["code"]) {
                     item2['sta_ph_l'] = this.turnLevel(item2['sta_ph_l']);
                     item2['sta_do_l'] = this.turnLevel(item2['sta_do_l']);
                     item2['sta_an_l'] = this.turnLevel(item2['sta_an_l']);
                     item2['level'] =  d3.max([item2['sta_ph_l'],item2['sta_do_l'],item2['sta_an_l']]);
                     tmpArray1.push(item2);
                 }
             });
             if(tmpArray1 ===[]){
                 item["detail"] = null;
             }else {
                 item["detail"] = tmpArray1;
             }
             item["level"] = d3.max(item['detail'],(d,i)=>{
                 return d["level"]
             })
         });
         return data1;
     }
     getLineLevel(data1,LineName){
         LineName = LineName.map((item,index)=>{
             let tmp = {};
             let level = new Array(5);
             level.fill(0);
             if(item==="其他流域"){
                 data1.forEach((item3,index3)=>{
                     if(LineName.indexOf(item3["basin"])===-1){
                         switch (item3["level"]) {
                             case 1:level[0]+=1;break;
                             case 2:level[1]+=1;break;
                             case 3:level[2]+=1;break;
                             case 4:level[3]+=1;break;
                             case 5:level[4]+=1;break;
                             default: break;
                         }
                     }
                 })
             }
             else {
                 data1.forEach((item2,index2)=>{
                     if(item2["basin"]===item){
                         switch (item2["level"]) {
                             case 1:level[0]+=1;break;
                             case 2:level[1]+=1;break;
                             case 3:level[2]+=1;break;
                             case 4:level[3]+=1;break;
                             case 5:level[4]+=1;break;
                             default: break;
                         }
                     }
                 });
             }
             tmp["name"] = item;
             tmp["level"] = level;
             return tmp;
         });
         return LineName;
     }
     turnLevel(I) {
        switch(I){
            case "Ⅰ":return 1;
            case "Ⅱ":return 2;
            case "Ⅲ":return 3;
            case "Ⅳ":return 4;
            case "Ⅴ":return 5;
            case "劣Ⅴ":return 5;
            default :return 0;
        }
     }
     getPieData(pieData){
        let tmpDataData = {};
         tmpDataData["level"] = pieData["level"].map((item,index)=> {
             let level ;
             switch (index){
                 case 0 : level = 'I';break;
                 case 1 : level = 'II';break;
                 case 2 : level = 'III';break;
                 case 3 : level = 'IV';break;
                 case 4 : level = 'V';break;
                 default: break;
             }
             return {value:item,name:level}
         });
         tmpDataData["name"] = pieData["name"];
         return tmpDataData;
     }
     callback(msg){
        console.log("信息来了");
        console.log(msg);
        let tmpData3 = this.getPointData(this.state.tmpData1,msg);
        this.setState({
          tmpData2:tmpData3
        });
         console.log("data来了来了");
         console.log(this.state.LineName);
         if(this.state.pieData['name']!==msg){
             this.state.LineName.forEach((item,index) => {
                 if(item["name"]===msg) {
                     this.setState({
                         pieData:this.getPieData(item)
                     });
                 }
             });
         }
     }
     getMulLine(filterData11,msg){
         let PHseries = [];
         let Oseries = [];
         let Nseries = [];
         let Levelseries = [];
         filterData11.forEach((item,index)=>{
             const tmpFilter = this.getTmpFilter(item['detail']);
             PHseries.push(this.getPHData(tmpFilter,item["name"],"sta_ph_v","PH"));
             Oseries.push(this.getPHData(tmpFilter,item["name"],"sta_do_v","O2"));
             Nseries.push(this.getPHData(tmpFilter,item["name"],"sta_an_v","N2"));
             Levelseries.push(this.getPHData(tmpFilter,item["name"],"level","Level"))
         });
        // let allParLineData = {};
         let phtmp = [];
         let o2tmp = [];
         let n2tmp = [];
         let leveltmp = [];
         PHseries.forEach((item,index)=> {
            phtmp.push(PHseries[index]['sum_aver']);
            o2tmp.push(Oseries[index]['sum_aver']);
            n2tmp.push(Nseries[index]['sum_aver']);
            leveltmp.push(Levelseries[index]['sum_aver']);
        });
         return {
             phtmp,
             o2tmp,
             n2tmp,
             leveltmp,
             msg,
             PHseries,
             Oseries,
             Nseries,
             Levelseries
         }
     }
    render() {
        // console.log(this.state);
        if(this.state.LineNameCpy === undefined||this.state.tmpData2===undefined) {return(<div></div>) }
        else {
            console.log("重新渲染了");
            console.log(this.state);
            return (
                <div className="container">
                    <div className="left">
                        <Straight Line={this.state.Line} LineNameCpy={this.state.LineNameCpy} callback={this.callback}/>
                        <Map data={this.state.tmpData2}/>
                        <Pie data = {this.state.pieData}/></div>
                    <div id="top">
                        <div id="topBlow"><MulLine data={this.state.mulLineData}/></div>
                    <div className="right">
                        {/*<Other data = {this.state.PHseries}/>*/}
                        {/*<Other1 data={this.state.Oseries}/>*/}
                        {/*<Other2 data={this.state.Nseries}/>*/}
                        {/*<Other3 data={this.state.Levelseries}/>*/}
                        <div className="Bottom_chart"><Com_PH data={this.state.mulLineData.PHseries[0]}/></div>
                        <div className="Bottom_chart"><Com_N2 data={this.state.mulLineData.Nseries[0]}/></div>
                        <div className="Bottom_chart"><Com_Oxy data={this.state.mulLineData.Oseries[0]}/></div>
                        <div className="Bottom_chart"><Com_Level data={this.state.mulLineData.Levelseries[0]}/></div>
                    </div>
                        {/*<Pie data = {this.state.pieData}/>*/}
                    </div>
                </div>
            );
        }
  }
}

export default App;
