import React,{Component}from"react"
import Plot from "react-plotly.js";
import *as d3 from "d3";
class MulLine extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("地图数据来了");
        console.log(this.props);
        let phMax = d3.max(this.props.data.phtmp);
        let o2Max = d3.max(this.props.data.o2tmp);
        let n2Max = d3.max(this.props.data.n2tmp);
        // let levelMax = d3.max(this.props.data.leveltmp);
        var trace = {
            type: 'parcoords',
            line: {
                color: 'blue'
            },

            dimensions: [{
                range: [0, parseInt((phMax*1.4).toFixed(2))],
                constraintrange: [1, 2],
                label: 'PH',
                values: this.props.data.phtmp
            }, {
                range: [0, parseInt((o2Max*1.4).toFixed(2))],
                label: 'O2',
                values: this.props.data.o2tmp,
                // tickvals: [1.5,3,4.5,5]
            }, {
                range: [0,parseInt((n2Max*1.4).toFixed(2))],
                label: 'N2',
                values:this.props.data.n2tmp,
                // tickvals: [1,2,4,5],
                // ticktext: ['text 1','text 2','text 4','text 5']
            }, {
                range: [0, 5],
                label: 'Level',
                size:10,
                values: this.props.data.leveltmp
            }]
        };
        let data = [trace];

        let layout = {
            title: this.props.data.msg+'各流域一月份平均监测指标',
            width:`1550`,
            height:'300',
            // xaxis: {domain: [0.3, 0.7]},
        };
        this.setState({
            data,
            layout
        })

    }
    render(){
       return(
           <Plot data={this.state.data} layout={this.state.layout}/>
       )
    }
}
export default MulLine;