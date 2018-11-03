import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import *as d3 from "d3";
// import Plot from 'react-plotly.js'
// import Plotly from 'plotly.js'
class Map extends Component {
    constructor(props){
        super(props);
        this.state = {dataset:this.props.data};
        this.animate = this.animate.bind(this);
        this.drawImage = this.drawImage.bind(this);
    }
    componentDidMount() {
        this.drawImage(this.props.data)
    }
    animate(d){
        console.log(this.beat);
        const bear = function () {
            d3.active(this)
                .attr("r",4)
                .attr("fill","rgb(230,255,0,1)")
                .transition()
                .ease(d3.easeBackOut)
                .attr("r",3)
                .attr("fill","rgb(230,255,0,0.5)")
                .transition()
                .on("start",bear);
        };
        d.transition().duration(1000).ease(d3.easeBackOut)
            .on("start",bear);
    }
    drawImage(dataset) {
        let width = 400;
        let height = 300;

        // 投影函数
        let projection = d3.geoMercator()
            .center([107, 31])
            .scale(340)
            .translate([width * 6 / 11, height * 5 / 7]);

        // 地理路径生成器
        let path = d3.geoPath()
            .projection(projection); // 设定路径生成器的投影函数


        // let color = d3.schemeCategory20;

        const bkcolor = 'grey';
        //  向服务器请求文件并绘制地图
        // 所有读取到的信息会被放到root中
        let that = this;
        let tooltip = d3.select('body')
            .append("div")
            .attr("class", 'tooltip')
            .style("opacity", 0.0);

        if(document.getElementById("svg_svg")) {
            d3.selectAll(".point2").remove();
            let svg = d3.select("#svg_svg");
            let points = svg.selectAll(".circle")
                .data(dataset)		//绑定数组
                .enter()
                .append("circle")
                .attr("class", "point2")
                .attr("cx", function (d) {
                    return 220;	//设定x坐标
                })
                .attr("cy", function (d) {
                    return 200;	//设定y坐标
                })
                .attr("r", 4)
                .attr("fill", "rgb(230,255,0,0.5)")//标注点半径
                .on('mouseover', (item, index) => {
                    tooltip.html("所属流域:" + item['basin'] + '<br/>' +
                        "名字:" + item['name'] + '<br/>'
                        + "描述:" + item['detail'])
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY + 20) + "px")
                        .style("display","block")
                        .style("opacity", 1.0)
                })
                .on("mouseout", (item, index) => {
                    tooltip.style("opacity", 0.0)
                        .style("display","none")
                })
                .transition()
                .duration(1000)
                .ease(d3.easeBackIn)
                .attr("cx",function (d) {
                    return projection([d.log, d.lat])[0];
                })
                .attr("cy",function (d) {
                    return projection([d.log, d.lat])[1];
                });
            that.animate(points);

        }else {
            let svg = d3.select("#svg_div").append("svg")
                .attr("id", "svg_svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(0,0)");
            d3.json("china.geojson", function (error, root) {

                if (error)
                    return console.error(error);
                // console.log(root.features);
                // console.log(this.props);
                svg.selectAll("path") // 每一个<path>代表一个省
                    .data(root.features)
                    .enter()
                    .append("path")
                    .attr("stroke", "#fff")
                    .attr("stroke-width", 1)
                    .attr("fill", function (d, i) {
                        if (i >= 20) {
                            return bkcolor;
                        }
                        return bkcolor;
                    })
                    .attr("d", function (d) {
                        // console.log(d);
                        return path(d);
                    });
                // .attr("d", path) // 使用地理路径生成器
                let points = svg.selectAll(".circle")
                    .data(dataset)		//绑定数组
                    .enter()
                    .append("circle")
                    .attr("class", "point2")
                    .attr("cx", function (d) {
                        return projection([d.log, d.lat])[0];	//设定x坐标
                    })
                    .attr("cy", function (d) {
                        return projection([d.log, d.lat])[1];	//设定y坐标
                    })
                    .attr("r", 4)
                    .attr("fill", "rgb(230,255,0,0.5)")//标注点半径
                    .on('mouseover', (item, index) => {
                        tooltip.html("所属流域:" + item['basin'] + '<br/>' +
                            "名字:" + item['name'] + '<br/>'
                            + "描述:" + item['detail'])
                            .style("left", (d3.event.pageX) + "px")
                            .style("top", (d3.event.pageY + 20) + "px")
                            .style("opacity", 1.0)
                    })
                    .on("mouseout", (item, index) => {
                        tooltip.style("opacity", 0.0);
                    });
                that.animate(points);
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if(this.state.dataset !==nextProps.data) {
            this.drawImage(nextProps.data);
            this.setState({
                dataset:nextProps.data
            })
        }
    }
    render() {
        return (
            <div id="svg_div"></div>
        );
    }
}

export default Map;
