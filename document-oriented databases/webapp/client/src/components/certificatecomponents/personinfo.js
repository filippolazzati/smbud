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
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Person info</h5>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Name: <b>{this.state.owner.name}</b></li>
                        <li className="list-group-item">Surname: <b>{this.state.owner.surname}</b></li>
                        <li className="list-group-item">Date of Birth: <b>{this.state.owner.dateOfBirth}</b></li>
                        <li className="list-group-item">Fiscal Code: <b>{this.state.owner.fiscalCode}</b></li>
                        <li className="list-group-item">Phone Number: <b>{this.state.owner.phoneNumber}</b></li>
                    </ul>
                </div>
            </div>
        )
    }
}