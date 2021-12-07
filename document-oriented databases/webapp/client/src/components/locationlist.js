import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Location = (props) => (
    <tr>
        <td>{props.location.name}</td>
        <td>{props.location.address}</td>
        <td>
        <Link to={"/location/" + props.location._id}>View</Link>
        </td>
    </tr>
);

export default class LocationList extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            locations: null,
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal(){
        this.setState({modal: true});
    }

    hideModal(){
        this.setState({modal: false});
    }

    componentDidMount(){
        axios
            .get('http://localhost:5000/locations/getLocations/20')
            .then((res) => {
                this.setState({
                    locations: res.data,
                });
            })
            .catch((err) => console.log(err));
    }

    locationList(){
        return this.state.locations.map((location) => {
            return <Location key={location._id} location={location}/>
        });
    }

    render(){
        if(!this.state.locations){
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>List of locations</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">View location</th>
                            </tr>
                        </thead>
                        <tbody>{this.locationList()}</tbody>
                    </table>
                </div>
            )
        }
    }
}