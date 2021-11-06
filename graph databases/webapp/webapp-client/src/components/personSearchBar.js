import React, { Component } from "react";
import axios from 'axios';

export default class PersonSearchBar extends Component {
    constructor(props){
        super(props);

        this.onChangePersonName = this.onChangePersonName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            personName: "",
        };
    }

    onChangePersonName(e){
        this.setState({
            personName: e.target.value,
        });
    }

    onSubmit(e){
        e.preventDefault();

        const personName = this.state.personName;

        axios
            .get('http://localhost:5000/users/getByName/' + personName)
            .then((res) => console.log(res.data));
    }

    render(){
        return (
            <div>
                <h2>Search a person</h2>
                <form class="row g-2" onSubmit={this.onSubmit}>
                    <div class="col-8">
                        <input 
                            type="text" 
                            class="form-control" 
                            placeholder="Name and Surname" 
                            value={this.state.personName}
                            onChange={this.onChangePersonName}
                        />                    
                    </div>
                    <div class="col-1">
                        <button type="submit" class="btn btn-outline-success mb-3">Search</button>
                    </div>
                </form>
            </div>
        );
    }
}