import React, { Component } from "react";

const Test = (props) => (
    <li className="list-group-item">Type: <b>{props.type}</b> - Date: <b>{props.date}</b></li>
);

export default class TestsList extends Component{
    constructor(props){
        super(props);

        this.state = {
            tests: this.props.tests 
        }
    }

    testList(){
        return this.state.tests.map((test) => {
            return <Test key={test.id} type={test.type} date={test.date}/>
        });
    }

    render(){
        return(
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Tests List</h5>
                    <ul className="list-group list-group-flush">
                        {this.testList()}
                    </ul>
                </div>
            </div>
        )
    }
}