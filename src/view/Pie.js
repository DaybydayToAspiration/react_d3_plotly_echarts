import React,{Component}from"react"
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Pie extends Component{
    constructor(props){
        super(props);
        this.state = {};
        this.drawPie = this.drawPie.bind(this);
    }

    componentDidMount() {
        this.drawPie(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.drawPie(nextProps)
    }
    drawPie(dataProps){
        // var echarts = require('echarts');
// 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('main4'));
// 绘制图表
        console.log("长江来了");
        console.log(dataProps.data);
        myChart.setOption({
            backgroundColor: '#ffffff',

            title: {
                text: `${dataProps.data['name']}地表水等级`,
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },

            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            // visualMap: {
            //     show: false,
            //     min: 80,
            //     max: 600,
            //     inRange: {
            //         colorLightness: [0, 1]
            //     }
            // },
            legend: {
                // bottom:50,
                orient: 'vertical',
                x:'right',
                data:['I','II','III','IV','V']
            },
            series :  [
                {
                    name:`${dataProps.data['name']}`,
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: true,
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:dataProps.data.level.sort(function (a, b) { return a.value - b.value; })
                }
            ]
        });
        // data:this.props.data.level.sort(function (a, b) { return a.value - b.value; }),
        console.log("pie");
        console.log(this.props.data.level);
    }
    render(){
        return (
            <div id="main4"></div>
        )
    }
}
export default Pie