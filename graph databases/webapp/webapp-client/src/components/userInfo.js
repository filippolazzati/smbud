import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const Vaccine = (props) => (
    <li className="list-group-item"><b>{props.type}</b> - {props.date}</li>
);

const EditDateButton = (props) => (
    <Link to={"/user/" + props.userId + "/editTest/" + props.testDate}>
        <button type="button" className="btn btn-outline-warning btn-sm float-end">Edit date</button>
    </Link>
);

const Test = (props) => (
    <li className="list-group-item">{props.date} - {props.result} 
        { props.result === "unknown" ? 
            <EditDateButton
                userId={props.userId}
                testDate={props.isoDate}
            /> 
            : null }
    </li>
);

export default class UserInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_info: {},
            user_vaccines: [],
            user_tests:[],
            modal_show: false,
            modal_setShow: false,
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/users/getById/" + this.props.id)
            .then((res) => {
                this.setState({
                    user_info: res.data.user[0],
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
                    key={this.buildDate(test.Time).toISOString()} 
                    result={test.Result} 
                    userId={this.state.user_info.Id} 
                    date={this.buildDate(test.Time).toDateString()} 
                    isoDate={this.buildDate(test.Time).toISOString()}
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
                                <li className="list-group-item"><b>Id: </b>{this.state.user_info.Id}</li>
                                <li className="list-group-item"><b>Name: </b>{this.state.user_info.Name}</li>
                                <li className="list-group-item"><b>Surname: </b>{this.state.user_info.Surname}</li>
                                <li className="list-group-item"><b>Date of birth: </b>{this.state.user_info.DateOfBirth}</li>
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