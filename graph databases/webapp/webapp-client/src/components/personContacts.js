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

export default class PersonContacts extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName: "",
            userSurname: "",
            users: [],
        }
    }

    componentDidMount(){
        axios
            .get('http://localhost:5000/users/get/' + this.props.match.params.id)
            .then((res1) => {
                this.setState({
                    userName: res1.data.properties.Name,
                    userSurname: res1.data.properties.Surname,
                });
                axios
                    .get('http://localhost:5000/users/getContacts/' + this.props.match.params.id)
                    .then((res2) => {
                        this.setState({
                            users: res2.data.contacts,
                        });
                    })
                    .catch((err) => console.log(err));
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
                <h1><b>{this.state.userName + " " + this.state.userSurname}</b> contacts in the last 5 days</h1>
                <table className="table table-stripped">
                    <tbody>{this.userList()}</tbody>
                </table>
            </div>
        )
    }
}