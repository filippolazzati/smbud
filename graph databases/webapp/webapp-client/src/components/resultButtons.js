import React, { Component } from "react";
import axios from "axios";

export default class ResultButtons extends Component{
    constructor(props){
        super(props);
        console.log(props);

        this.sendNegative = this.sendNegative.bind(this);
        this.sendPositive = this.sendPositive.bind(this);

        this.state = {
            testId: props.id,
            userId: props.userId,
            reload: props.reload,
        }
    }

    sendPositive(){
        let result = {
            testId: this.state.testId,
            result: 'positive'
        }

        axios.post("http://localhost:5000/tests/saveResult", result)
            .then((res) => {
                window.location.reload(false);
            });
    }

    sendNegative(){
        let result = {
            testId: this.state.testId,
            result: 'negative'
        }
        
        axios.post("http://localhost:5000/tests/saveResult", result)
            .then((res) => {
                window.location.reload(false);
            });
    }

    render(){
        return(
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-success btn-sm" onClick={this.sendNegative}>NEGATIVE</button>
                <button type="button" className="btn btn-danger btn-sm" onClick={this.sendPositive}>POSITIVE</button>
            </div>
        )
    }
}