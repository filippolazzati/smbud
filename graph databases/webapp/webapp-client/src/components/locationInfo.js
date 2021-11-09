import React, { Component } from "react";
import axios from "axios";

export default class LocationInfo extends Component{
    constructor(props){
        super(props);

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: this.props.match.params.id,
            address: "",
            description: "",
            date: new Date(),
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

    onChangeDate(e){
        this.setState({
            date: e.target.value,
        })
    }

    onSubmit(e){
        e.preventDefault();

        this.props.history.push("/location/" + this.state.id + "/visitors/" + this.state.date);
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
                <hr />
                <h3>Find who visited this location on a specific date:</h3>
                <form className="row g-2" onSubmit={this.onSubmit}>
                    <div className="col-8">
                        <input 
                            type="date" 
                            className="form-control" 
                            placeholder="Date" 
                            value={this.state.date}
                            onChange={this.onChangeDate}
                        />                    
                    </div>
                    <div className="col-1">
                        <button type="submit" className="btn btn-lg btn-outline-success mb-3">Search</button>
                    </div>
                </form>
            </div>
        )
    }
}