import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const Vaccine = (props) => (
    <li className="list-group-item">{props.date} - <b>{props.type}</b></li>
);

const EditDateButton = (props) => (
    <Link to={"/test/" + props.id + "/editDate"}>
        <button type="button" className="btn btn-outline-warning btn-sm float-end">Edit date</button>
    </Link>
);

const Test = (props) => (
    <li className="list-group-item">{props.date} - <b>{props.result.toUpperCase()}</b>
        { props.result.toUpperCase() === "UNKNOWN" ? 
            <EditDateButton
                id={props.testId}
            /> 
            : null }
    </li>
);

export default class UserInfo extends Component{
    constructor(props){
        super(props);

        this.state = {
            user_id: null,
            user_properties: {},
            user_vaccines: [],
            user_tests:[],
            editTestId: null,
            editTestDate: new Date(),
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/users/getById/" + this.props.id)
            .then((res) => {
                this.setState({
                    user_id: res.data.user[0].id,
                    user_properties: res.data.user[0].properties,
                    user_vaccines: res.data.vaccines,
                    user_tests: res.data.tests,
                });
            })
            .catch((err) => console.log(err));
    }

    buildDate(date){
        return new Date(
            date.year.low,
            date.month.low,
            date.day.low,
            date.hour.low,
            date.minute.low,
            date.second.low
        );
    }

    vaccineList(){
        return this.state.user_vaccines.map((vaccine) => {
            return <Vaccine key={this.buildDate(vaccine.Date).toISOString()} type={vaccine.Type} date={this.buildDate(vaccine.Date).toDateString()} />
        })
    }

    testList(){
        return this.state.user_tests.map((test) => {
            return (
                <Test 
                    key={test.id} 
                    testId={test.id}
                    result={test.properties.Result} 
                    userId={this.state.user_id} 
                    date={this.buildDate(test.properties.Time).toDateString()} 
                    isoDate={this.buildDate(test.properties.Time).toISOString()}
                />
            )
        })
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                General Informations
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><b>Id: </b>{this.state.user_id}</li>
                                <li className="list-group-item"><b>Name: </b>{this.state.user_properties.Name}</li>
                                <li className="list-group-item"><b>Surname: </b>{this.state.user_properties.Surname}</li>
                                <li className="list-group-item"><b>Date of birth: </b>{this.state.user_properties.DateOfBirth}</li>
                            </ul>
                        </div>
                        <br />
                        <div className="card">
                            <div className="card-header">
                                Vaccines
                            </div>
                            <ul className="list-group list-group-flush">
                                {this.vaccineList()}
                            </ul>
                        </div>
                    </div>
                    <div className="col">
                    <div className="card">
                            <div className="card-header">
                                Tests
                            </div>
                            <ul className="list-group list-group-flush">
                                {this.testList()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}