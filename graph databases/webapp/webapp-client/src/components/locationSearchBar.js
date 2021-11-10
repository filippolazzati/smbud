import React, { Component } from "react";
import axios from 'axios';
import { withRouter } from "react-router";

const Alert = () => (
    <div className="alert alert-danger" role="alert">
        Could not find the specified location!
    </div>
)

class LocationSearchBar extends Component {
    constructor(props){
        super(props);

        this.onChangeLocationName = this.onChangeLocationName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            locationName: "",
            alertVisible: false,
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
            .get('http://localhost:5000/locations/getLocationByAddress/' + locationName)
            .then((res) => {
                if(res.data.location.length > 0){
                    this.props.history.push("/location/" + res.data.location[0].id)
                } else {
                    this.setState({
                        alertVisibile: true,
                    });
                    setTimeout(() => {
                        this.setState({
                            alertVisibile: false,
                        })
                    }, 3000);
                }
            });
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
                {this.state.alertVisibile ? <Alert /> : null}
            </div>
        );
    }
}

export default withRouter(LocationSearchBar);