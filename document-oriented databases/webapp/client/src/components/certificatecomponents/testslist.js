import React, { Component } from "react";

const Test = (props) => (
    <li className="list-group-item">Type: {props.type} - Date: {props.date}</li>
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
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Tests List</h5>
                    <ul class="list-group list-group-flush">
                        {this.testList()}
                    </ul>
                </div>
            </div>
        )
    }
}