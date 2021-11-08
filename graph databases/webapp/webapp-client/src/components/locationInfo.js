import React, { Component } from "react";
import axios from "axios";

export default class LocationInfo extends Component{
    constructor(props){
        super(props);

        this.state = {
            id: this.props.match.params.id,
            address: "",
            description: "",
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/locations/getLocationById/" + this.state.id)
            .then((res) => {
                this.setState({
                    address: res.data.location.address,
                    description: res.data.location.description,
                })
            })
            .catch((err) => console.log(err));
    }

    render(){
        return(
            <div>
                <h1>Location overview</h1>
                <hr />
                <div className="card">
                    <div className="card-header">
                        General Informations
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><b>Id: </b>{this.state.id}</li>
                        <li className="list-group-item"><b>Address: </b>{this.state.address}</li>
                        <li className="list-group-item"><b>Type: </b>{this.state.description}</li>
                    </ul>
                </div>
            </div>
        )
    }
}