import React,{Component} from "react"
import Plot from "react-plotly.js"

class Matrix extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let array = new Array(31);
        array.fill(0);
        array = array.map((item,index) =>{
           return index+1
        });
        console.log(array);
        let trace1 = {
            type: 'scatter',
            x: [1, 2, 3, 4],
            y: [10, 15, 13, 17],
            mode: 'lines',
            name: 'Red',
            line: {
                color: 'rgb(219, 64, 82)',
                width: 3
            }
        };

        let trace2 = {
            type: 'scatter',
            x: [1, 2, 3, 4],
            y: [12, 9, 15, 12],
            mode: 'lines',
            name: 'Blue',
            line: {
                color: 'rgb(55, 128, 191)',
                width: 1
            }
        };

        var layout = {
            // title: 'Title of the Graph',
            width: 340,
            height: 300
        };

        var data = [trace1, trace2];;
        this.setState({
            data,
            layout
        });
    }
    render(){
        return (
            <Plot
                data = {this.state.data}
                layout={this.state.layout}
            />
        )
    }
}
export default Matrix