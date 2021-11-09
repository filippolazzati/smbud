import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const User = (props) => (
  <tr>
    <td>{props.name} {props.surname}</td>
    <td>
      <Link to={"/user/" + props.id}>View</Link>
    </td>
  </tr>
);

export default class LocationVisitors extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: this.props.match.params.date,
            id: this.props.match.params.id,
            users: [],
        }
    }

    componentDidMount(){
        axios
            .get('http://localhost:5000/locations/getVisitors/' + this.props.match.params.id + "/" + this.props.match.params.date)
            .then((res) => {
                this.setState({
                    users: res.data.visitors,
                })
            })
            .catch((err) => console.log(err));
    }

    userList(){
        return this.state.users.map((user) => {
            return <User key={user.id} id={user.id} name={user.properties.Name} surname={user.properties.Surname}/>
        });
    }

    render(){
        return (
            <div>
                <h1>Location visitors in date {this.state.date}</h1>
                <table className="table table-stripped">
                    <tbody>{this.userList()}</tbody>
                </table>
            </div>
        )
    }
}