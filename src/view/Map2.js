import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Plot from 'react-plotly.js'
// import Plotly from 'plotly.js'
class Map2 extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        // let data = [{
        //     type:'scattermapbox',
        //     lat:['29.01563889'],
        //     lon:['105.8489722'],
        //     mode:'markers',
        //     marker: {
        //         size:14,
        //         color:"red"
        //     },
        //     text:['长江']
        // }];
        // let data = this.props.data;
        // let layout = {
        //     autosize: true,
        //     hovermode:'closest',
        //     mapbox: {
        //         bearing:0,
        //         center: {
        //             lat:34.162,
        //             lon: 108.54
        //         },
        //         pitch:0,
        //         zoom:2,
        //     },
        // };
        // this.setState({
        //     data,
        //     layout
        // });

    }

    render() {
        // let mapBox = {mapboxAccessToken:'pk.eyJ1Ijoid3VzaWNvbmciLCJhIjoiY2prZmlncHlsMDh6YzNrbGUycXVyaDZyNyJ9.CM5rTGQcK855LW_mFIEa4g'};
        // return (
        //     <Plot data = {this.state.data}
        //         layout = {this.state.layout}
        //     config = {mapBox}/>
        // );
        return (
            <div>123</div>
        )
    }
}

export default Map2;
