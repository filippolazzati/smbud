import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Location = (props) => (
  <tr>
    <td>{props.address}</td>
    <td>
      <Link to={"/location/" + props.id}>View</Link>
    </td>
  </tr>
);

export default class LocationsOfType extends Component {
    constructor(props){
        super(props);
        this.state = {
            locationType: "",
            locations: [],
        }
    }

    componentDidMount(){
        axios
            .get('http://localhost:5000/locations/getLocationByDescription/' + this.props.match.params.type)
            .then((res) => {
                this.setState({
                    locationType: this.props.match.params.type,
                    locations: res.data.locations,
                });
            })
            .catch((err) => console.log(err));
    }

    locationList(){
        return this.state.locations.map((location) => {
            return <Location key={location.Id} id={location.Id} address={location.Address}/>
        });
    }

    render(){
        return (
            <div>
                <h1>{this.state.locationType + "s"}</h1>
                <table className="table table-stripped">
                    <tbody>{this.locationList()}</tbody>
                </table>
            </div>
        )
    }
}