import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Location = (props) => (
  <tr>
    <td>{props.type}</td>
    <td>
      <Link to={"/location/" + props.id}>View</Link>
    </td>
  </tr>
);

export default class LocationTypeList extends Component {
    constructor(props){
        super(props);
        this.state = {
            locations: [],
        }
    }

    componentDidMount(){
        axios
            .get('http://localhost:5000/locations/getDescriptions')
            .then((res) => {
                this.setState({
                    locations: res.data.Descriptions,
                });
            })
            .catch((err) => console.log(err));
    }

    locationList(){
        return this.state.locations.map((loc) => {
            return <Location key={loc} type={loc}/>
        });
    }

    render(){
        return (
            <div>
                <table className="table table-stripped">
                    <tbody>{this.locationList()}</tbody>
                </table>
            </div>
        )
    }
}