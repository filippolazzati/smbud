import React, { Component } from "react";
import axios from 'axios';
import { withRouter } from "react-router";

const Alert = () => (
    <div className="alert alert-danger" role="alert">
        Could not find the specified person!
    </div>
)

class PersonSearchBar extends Component {
    constructor(props){
        super(props);

        this.onChangePersonName = this.onChangePersonName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            personName: "",
            alertVisibile: false,
        };
    }

    onChangePersonName(e){
        this.setState({
            personName: e.target.value,
        });
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    buildName(personName){
        let builtName = "";
        personName.forEach((word) => {
            builtName = builtName + this.capitalizeFirstLetter(word.toLowerCase()) + "_";
        });
        return builtName.slice(0,builtName.length-1);
    }

    onSubmit(e){
        e.preventDefault();

        let personName = this.state.personName.split(" ");

        axios
            .get('http://localhost:5000/users/getByName/' + this.buildName(personName))
            .then((res) => {
                if(res.data.users.length > 0){
                    this.props.history.push("/user/" + res.data.users[0].id);
                } else {
                    this.setState({
                        alertVisibile: true,
                    });
                    setTimeout(() => {
                        this.setState({
                            alertVisibile: false,
                        })
                    }, 3000);
                }
            });
    }

    render(){
        return (
            <div>
                <h2>Search a person</h2>
                <form className="row g-2" onSubmit={this.onSubmit}>
                    <div className="col-8">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Name and Surname" 
                            value={this.state.personName}
                            onChange={this.onChangePersonName}
                        />                    
                    </div>
                    <div className="col-1">
                        <button type="submit" className="btn btn-outline-success mb-3">Search</button>
                    </div>
                </form>
                {this.state.alertVisibile ? <Alert /> : null}
            </div>
        );
    }
}

export default withRouter(PersonSearchBar);