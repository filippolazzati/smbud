import React, { Component } from "react";
import axios from 'axios';

import PersonInfo from "./certificatecomponents/personinfo";
import TestsList from "./certificatecomponents/testslist";
import VaccinesList from "./certificatecomponents/vaccineslist";
import ValidityAlert from "./certificatecomponents/validityalert";

export default class Certificate extends Component{
    constructor(props){
        super(props);
        
        this.calculateCertificateValidity = this.calculateCertificateValidity.bind(this);

        this.state = {
            certficateCode: this.props.match.params.id,
            certificate: null,
            valid: false,
            expiration: null,
        }

    }

    componentDidMount(){
        axios.get('http://localhost:5000/certificates/getByCode/' + this.state.certficateCode)
        .then((res) => {
            this.setState({
                certificate: res.data,
            });
            this.calculateCertificateValidity()
        })
        .catch((err) => console.log(err));
    }
    
    calculateCertificateValidity(){
        let validCertificate = false;
        let today = new Date();
        let expiration = null;
        this.state.certificate.vaccines.forEach(vaccine => { //Check if there is a valid vaccine
            let vaccineExpiration = new Date(vaccine.date);
            vaccineExpiration.setTime(vaccineExpiration.getTime() + (vaccine.validity*60*60*1000));
            if(!expiration || vaccineExpiration > expiration)
                expiration = vaccineExpiration;
            if(vaccineExpiration > today)
                validCertificate = true;
        });
        this.state.certificate.tests.forEach(test => { //Check if there is a valid test
            let testExpiration = new Date(test.date);
            testExpiration.setTime(testExpiration.getTime() + (test.validity*60*60*1000));
            if(!expiration || testExpiration > expiration)
                expiration = testExpiration;
            if(testExpiration > today)
                validCertificate = true;
        });
        if(this.state.certificate.tests.size > 1){ //Check if the owner is recovered
            if(!this.state.certificate.tests[this.state.certificate.tests.sizesize-1].result 
                && this.state.certificate.tests[this.state.certificate.tests.size-2].result){
                let recoveryExpiration = new Date(this.state.certificate.tests[this.state.certificate.tests.size-1]);
                recoveryExpiration.setTime(recoveryExpiration.getTime() + (4320*60*60*1000));
                if(!expiration || recoveryExpiration > expiration)
                    expiration = recoveryExpiration;
                if(recoveryExpiration > today)
                    validCertificate = true;
            }
        }
        this.setState({
            valid: validCertificate,
            expiration: expiration,
        })
        console.log(this.state);
    }

    render(){
        if(this.state.certificate == null){
            return(
                <h1>Loading...</h1>
            )
        } else {
            return (
                <div>
                    <h1>Certificate - {this.state.certficateCode}</h1>
                    <ValidityAlert valid={this.state.valid} expiration={this.state.expiration}/>
                    <hr />
                    <div className="row">
                        <div className="col-5">
                            <PersonInfo owner={this.state.certificate.owner}/>
                        </div>
                        <div className="col-7">
                            <VaccinesList vaccines={this.state.certificate.vaccines}/>
                            <hr />
                            <TestsList tests={this.state.certificate.tests}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}