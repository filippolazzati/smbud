import React, { Component } from "react";
import axios from "axios";

export default class LocationInfo extends Component{
    constructor(props){
        super(props);

        this.state = {
            id: this.props.match.params.id,
            location: null,
            numOfVaccines: null,
            numOfTests: null,
        }
    }

    componentDidMount(){
        Promise.all([
            axios.get("http://localhost:5000/locations/getById/" + this.state.id),
            axios.get("http://localhost:5000/locations/getVaccinations/" + this.state.id),
            axios.get("http://localhost:5000/locations/getTests/" + this.state.id)
        ])
        .then(([resInfo, resVaccines, resTests]) => {
            this.setState({
                location: resInfo.data,
                numOfVaccines: resVaccines.data.count,
                numOfTests: resTests.data.count,
            })
        });
    }

    render(){
        if(!this.state.location){
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        } else {
            return(
                <div>
                    <h1>Location overview</h1>
                    <hr />
                    <div className="card">
                        <div className="card-header">
                            General Informations
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><b>Name: </b>{this.state.location.name}</li>
                            <li className="list-group-item"><b>Address: </b>{this.state.location.address}</li>
                            <li className="list-group-item"><b>Type: </b>{this.state.location.typeOfService}</li>
                            <li className="list-group-item"><b>Coordinates: </b>{this.state.location.coordinates[0]} - {this.state.location.coordinates[1]}</li>
                        </ul>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <h3>Number of administered vaccines: {this.state.numOfVaccines}</h3>
                        </div>
                        <div className="col">
                            <h3>Number of administered tests: {this.state.numOfTests}</h3>
                        </div>
                    </div>
                </div>
            )
        }
    }
}