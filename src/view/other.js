import React,{Component}from"react"
// import echarts from 'echarts/lib/echarts';
// // 引入柱状图
// import  'echarts/lib/chart/line';
// // 引入提示框和标题组件
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';
import *as d3 from "d3";
import Plot from 'react-plotly.js'
class other extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount() {
        // var echarts = require('echarts');
        let array = new Array(31).fill(0).map((item,index)=>{
            return index+1
        });
// // 基于准备好的dom，初始化echarts实例
//         let myChart = echarts.init(document.getElementById('main'));
// // 绘制图表
//
        console.log(12345);
        console.log(this.props);
        let data = [];
        let color = d3.schemeCategory20;
        this.props.data.forEach((item,index) => {
            let trace3 = {
                x: array,
                y: item["data"],
                mode: 'lines',
                marker: {
                    color: `${color[index%20]}`,
                    size: 8
                },
                line: {
                    color:  `${color[index%20]}`,
                    width: 1
                }
            };
            data.push(trace3);
        });
        let layout = {
            title: 'Line and Scatter Styling'
        };
        this.setState({
            data:data,
            layout
        })
    }
    render(){
        return (
            <Plot data={this.state.data} layout={this.state.layout}/>
        )
    }
}
export default other