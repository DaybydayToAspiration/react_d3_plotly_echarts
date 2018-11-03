import React,{Component} from "react"
import Plot from "react-plotly.js";
class Com_Oxy extends Component{
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
        let trace1 = {
            type: 'scatter',
            x: arrayy,
            y: this.props.data["data"],
            mode: 'lines',
            name: 'Red',
            line: {
                color: 'rgb(219, 64, 82)',
                width: 3
            }
        };

        // let trace2 = {
        //     type: 'scatter',
        //     x: [1, 2, 3, 4],
        //     y: [12, 9, 15, 12],
        //     mode: 'lines',
        //     name: 'Blue',
        //     line: {
        //         color: 'rgb(55, 128, 191)',
        //         width: 1
        //     }
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
export default Com_Oxy;