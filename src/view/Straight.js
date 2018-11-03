import React, { Component } from 'react';
import Plot from 'react-plotly.js'
class Straight extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.changeSelect = this.changeSelect.bind(this);
    }
    changeSelect(data){
        let tmpColor = 'rgba(222,45,38,0.8)';
        let color = [ '#C8A2C8', '#C8A2C8','#C8A2C8', '#C8A2C8', '#C8A2C8','#C8A2C8','#C8A2C8','#C8A2C8','#C8A2C8','#C8A2C8',];
        console.log(345);
        console.log(data);
         color[data.points[0]['pointIndex']]=tmpColor;
         let tmpData1 = this.state.data1;
         tmpData1[0]['marker']['color'] = color;
        this.setState({
        data1:tmpData1
        });
        this.props.callback(data.points[0]["x"])
    }
    componentDidMount() {
        // console.log(this.props);
            console.log(this.props);
            // console.log(this);
            let y = [];
            this.props.LineNameCpy.forEach((item,index)=>{
                y.push(this.props.Line[item])
            });
            console.log(y);
            let trace1 = {
                type: 'bar',
                x: this.props.LineNameCpy,
                y: y,
                marker: {
                    color: [ 'rgba(222,45,38,0.8)', '#c8a2c8','#C8A2C8', '#C8A2C8', '#C8A2C8','#C8A2C8','#C8A2C8','#C8A2C8','#C8A2C8','#C8A2C8',],
                    line: {
                        width: 1
                    },
                }
            };

            let data1 = [ trace1 ];

            let layout = {
                title: '国控地表水监测流域总览',
                font:{
                    family: 'Raleway, sans-serif'
                },
                // showlegend: false,
                xaxis: {
                    tickangle: -45
                },
            };
            this.setState({
                data1,
                layout
            })
    }
    render() {
        // Plotly.d3.csv("point.csv",function (err,data) {
        //     console.log(data);
        let map = {responsive: true};
        // Plotly.setPlotConfig({
        //     mapboxAccessToken: 'pk.eyJ1Ijoid3VzaWNvbmciLCJhIjoiY2prZmlncHlsMDh6YzNrbGUycXVyaDZyNyJ9.CM5rTGQcK855LW_mFIEa4g'
        // });
        // console.log(this.state.data1);
        // console.log(this.state.layout);
        // console.log(this);
        return (
            <Plot
                 data={this.state.data1}
                 layout={this.state.layout}
                 config={map}
                 onClick={this.changeSelect}
            />
        );
    }
}

export default Straight;
