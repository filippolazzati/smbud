import React, { Component } from "react";
import axios from 'axios';

export default class LocationSearchBar extends Component {
    constructor(props){
        super(props);

        this.onChangeLocationName = this.onChangeLocationName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            locationName: "",
        };
    }

    onChangeLocationName(e){
        this.setState({
            locationName: e.target.value,
        });
    }

    onSubmit(e){
        e.preventDefault();

        const locationName = this.state.locationName;

        axios
            .get('http://localhost:5000/locations/getByName/' + locationName)
            .then((res) => console.log(res.data));
    }

    render(){
        return (
            <div>
                <h2>Search a location</h2>
                <form className="row g-2" onSubmit={this.onSubmit}>
                    <div className="col-8">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Location address" 
                            value={this.state.locationName}
                            onChange={this.onChangeLocationName}
                        />                    
                    </div>
                    <div className="col-1">
                        <button type="submit" className="btn btn-outline-success mb-3">Search</button>
                    </div>
                </form>
            </div>
        );
    }
}