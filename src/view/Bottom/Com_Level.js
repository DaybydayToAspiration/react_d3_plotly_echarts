import React,{Component} from "react"
import Plot from "react-plotly.js";
class Com_Level extends Component{
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
        let array2 = new Array(31);
        array2.fill(0);
        array2  = array2.map((item,index) => {
            return Math.floor(Math.random()*31);
        });
        let array3 = new Array(31);
        array3.fill(0);
        array3  = array3.map((item,index) => {
            return Math.floor(Math.random()*31);
        });
        console.log("array1");
        console.log(arrayy);
        console.log(array);
        console.log(array3);
        console.log(array2);
        var trace1 = {
            x: arrayy,
            y:this.props.data["data"],
            mode: 'lines',
            name: 'Solid',
            line: {
                dash: 'solid',
                width: 4
            }
        };

        // var trace2 = {
        //     x: arrayy,
        //     y:array2,
        //     mode: 'lines',
        //     name: 'Solid',
        //     line: {
        //         dash: 'solid',
        //         width: 4
        //     }
        // };
        //
        // var trace3 = {
        //     x: arrayy,
        //     y:array3,
        //     mode: 'lines',
        //     name: 'Solid',
        //     line: {
        //         dash: 'solid',
        //         width: 4
        //     }
        // };


        var data = [trace1];

        var layout = {
            title:this.props.data["name"]+'子流域1月PH监测值',
            width:440,
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
export default Com_Level;