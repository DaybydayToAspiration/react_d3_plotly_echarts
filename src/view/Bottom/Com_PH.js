import React,{Component} from "react"
import Plot from "react-plotly.js";
class Com_PH extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount() {
        let array = new Array(31);
        let arrayy = new Array(31);
        arrayy.fill(0);
        arrayy = arrayy.map((item,index) => {
            return index+1;
        });
        array.fill(0);
        array  = array.map((item,index) => {
            return Math.floor(Math.random()*31);
        });
        var trace1 = {
            x: arrayy,
            y: this.props.data["data"],
            mode: 'lines+markers',
            name: 'linear',
            line: {shape: 'linear'},
            type: 'scatter',
            width:1,
        };

        // var trace2 = {
        //     x: arrayy,
        //     y: [6, 8, 7, 8, 6],
        //     mode: 'lines+markers',
        //     name: 'spline',
        //     // text: ['tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object'],
        //     line: {shape: 'spline'},
        //     type: 'scatter'
        // };
        //
        // var trace3 = {
        //     x: [1, 2, 3, 4, 5],
        //     y: [11, 13, 12, 13, 11],
        //     mode: 'lines+markers',
        //     name: 'vhv',
        //     line: {shape: 'vhv'},
        //     type: 'scatter'
        // };

        var data = [trace1];

        var layout = {
            title:this.props.data["name"]+'子流域1月PH监测值',
            width:472,
            height:260};
        this.setState({
            data,
            layout
        })
    }
    render(){
        return (
            <Plot data={this.state.data} layout={this.state.layout}/>
        );
    }
}
export default Com_PH;