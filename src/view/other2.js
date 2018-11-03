import React,{Component}from"react"
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class other1 extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount() {
        // var echarts = require('echarts');

// 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main2'));
// 绘制图表
        myChart.setOption({
            title: {
                text: '相对氨氮'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            series: this.props.data
        });
    }
    render(){
        return (
            <div id="main2"></div>
        )
    }
}
export default other1