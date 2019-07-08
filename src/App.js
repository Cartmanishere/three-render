import React from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import CubeComponent from './components/CubeComponent'
import LineComponent from './components/LineComponent'
import LoaderComponent from './components/LoaderComponent'
import OctahedronComponent from './components/OctahedronComponent'


const options = [
    { label: "Cube", value: 0 },
    { label: "Line", value: 1 },
    { label: "3D Model", value: 2 },
    { label: "Octahedron", value: 3 }
];


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.selectedOption = {label: 'Cube', value: 0};
        this.handleChange = this.handleChange.bind(this);
        this.values = [<CubeComponent />, <LineComponent />, <LoaderComponent />, <OctahedronComponent />];
    }

    handleChange(selectedOption) {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
        console.log(this.values[selectedOption.value]);
    }

    render() {
        return (

            <div className="main-app">
                <div className="select-box">
                    <Select value={this.state.selectedOption}
                            options={ options }
                            onChange={this.handleChange}/>
                </div>
                <div className="selected-component">
                    {this.values[this.state.selectedOption.value]}
                </div>
            </div>
        );
    }
}


export default App;
