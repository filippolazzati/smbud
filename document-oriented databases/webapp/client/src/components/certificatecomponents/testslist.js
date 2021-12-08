import React, { Component } from "react";

const Test = (props) => (
    <li className="list-group-item">
        Type: <b>{props.type}</b> - Date: <b>{new Date(props.date).toLocaleDateString('en-GB')}</b> 
        {props.result ? <p className='text-danger'><b>POSITIVE</b></p> : <p className='text-success'><b>NEGATIVE</b></p>}
    </li>
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
            return <Test key={test.date} type={test.type} date={test.date} result={test.result}/>
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