import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const User = (props) => (
  <tr>
    <td>{props.name}</td>
    <td>{props.surname}</td>
    <td>
      <Link to={"/user/" + props.id}>View</Link>
    </td>
  </tr>
);

export default class UserList extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
        }
    }

    componentDidMount(){
        axios
            .get('http://localhost:5000/users/test')
            .then((res) => {
                this.setState({
                    users: res.data.users,
                });
            })
            .catch((err) => console.log(err));
    }

    userList(){
        return this.state.users.map((user) => {
            return <User id={user.Id} name={user.Name} surname={user.Surname}/>
        });
    }

    render(){
        return (
            <div>
                <table className="table table-stripped">
                    <tbody>{this.userList()}</tbody>
                </table>
            </div>
        )
    }
}