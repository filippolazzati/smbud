import React, { Component } from "react";

export default class PersonInfo extends Component{
    constructor(props){
        super(props);

        this.state = {
            owner: this.props.owner,
        }
    }

    render(){
        return(
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Person info</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Name: <b>{this.state.owner.name}</b></li>
                        <li class="list-group-item">Surname: <b>{this.state.owner.surname}</b></li>
                        <li class="list-group-item">Date of Birth: <b>{this.state.owner.dateOfBirth}</b></li>
                        <li class="list-group-item">Fiscal Code: <b>{this.state.owner.fiscalCode}</b></li>
                        <li class="list-group-item">Phone Number: <b>{this.state.owner.phoneNumber}</b></li>
                    </ul>
                </div>
            </div>
        )
    }
}