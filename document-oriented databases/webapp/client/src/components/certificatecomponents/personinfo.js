import React, { Component } from "react";

export default class PersonInfo extends Component{
    constructor(props){
        super(props);

        this.state = {
            id: "ABC123",
            name: "Mario",
            surname: "Rossi",
            dateOfBirth: "25/12/1969"
        }
    }

    render(){
        return(
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Person info</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: {this.state.id}</li>
                        <li class="list-group-item">Name: {this.state.name}</li>
                        <li class="list-group-item">Surname: {this.state.surname}</li>
                        <li class="list-group-item">Date of Birth: {this.state.dateOfBirth}</li>
                    </ul>
                </div>
            </div>
        )
    }
}