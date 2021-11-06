import axios from "axios";
import React, { Component } from "react";

export default class UserInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_id: "",
            user_name: "",
            user_surname: "",
            user_dateOfBirth: "",
            user_homeId: "",
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/users/get/" + this.props.id)
            .then((res) => {
                this.setState({
                    user_id: res.data.Id,
                    user_name: res.data.Name,
                    user_surname: res.data.Surname,
                    user_homeId: res.data.HomeLocationId,
                    user_dateOfBirth: res.data.DateOfBirth
                });
                console.log(this.state);
            })
            .catch((err) => console.log(err));
    }

    render(){
        return(
            <div className="card">
                <div class="card-header">
                    General Informations
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><b>Id: </b>{this.state.user_id}</li>
                    <li class="list-group-item"><b>Name: </b>{this.state.user_name}</li>
                    <li class="list-group-item"><b>Surname: </b>{this.state.user_surname}</li>
                    <li class="list-group-item"><b>Date of birth: </b>{this.state.user_dateOfBirth}</li>
                </ul>
            </div>
        )
    }
}