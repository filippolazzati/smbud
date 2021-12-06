import React, { Component } from "react";
import PersonInfo from "./certificatecomponents/personinfo";
import TestsList from "./certificatecomponents/testslist";
import VaccinesList from "./certificatecomponents/vaccineslist";
import ValidityAlert from "./certificatecomponents/validityalert";

export default class Certificate extends Component{
    constructor(props){
        super(props);

        this.state = {
            certficateId: this.props.match.params.id,
            vaccines: [
                {id: "ABC123", type: "Moderna", date: "01/01/2021"},
                {id: "DEF456", type: "Astrazeneca" , date: "01/06/2021"},
            ],
            tests: [
                {id: "ABC123", type: "Rapid", date: "01/01/2021"},
                {id: "DEF456", type: "Rapid" , date: "01/06/2021"},
            ]
        }
    }
    render(){
        return (
            <div>
                <h1>Certificate - ID: {this.state.certficateId}</h1>
                <ValidityAlert valid={false} />
                <hr />
                <div className="row">
                    <div className="col-5">
                        <PersonInfo />
                    </div>
                    <div className="col-7">
                        <VaccinesList vaccines={this.state.vaccines}/>
                        <hr />
                        <TestsList tests={this.state.tests}/>
                    </div>
                </div>
            </div>
        )
    }
}