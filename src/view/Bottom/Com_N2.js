import React,{Component} from "react"
import Plot from "react-plotly.js";
class Com_N2 extends Component{
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
            mode: 'markers',
            name: 'North America',
            text: ['United States', 'Canada'],
            marker: {
                color: 'rgb(164, 194, 244)',
                size: 12,
                line: {
                    color: 'white',
                    width: 0.5
                }
            },
            type: 'scatter'
        };

        // var trace2 = {
        //     x: arrayy,
        //     y: [33, 20, 13, 19, 27, 19, 49, 44, 38],
        //     mode: 'markers',
        //     name: 'Europe',
        //     text: ['Germany', 'Britain', 'France', 'Spain', 'Italy', 'Czech Rep.', 'Greece', 'Poland'],
        //     marker: {
        //         color: 'rgb(255, 217, 102)',
        //         size: 12
        //     },
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
export default Com_N2;