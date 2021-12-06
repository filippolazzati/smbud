import React, { Component } from "react";
import axios from 'axios';

import PersonInfo from "./certificatecomponents/personinfo";
import TestsList from "./certificatecomponents/testslist";
import VaccinesList from "./certificatecomponents/vaccineslist";
import ValidityAlert from "./certificatecomponents/validityalert";

export default class Certificate extends Component{
    constructor(props){
        super(props);

        this.state = {
            certficateCode: this.props.match.params.id,
            certificate: null,
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/certificates/getByCode/' + this.state.certficateCode)
        .then((res) => {
            this.setState({
                certificate: res.data,
            });
        })
        .catch((err) => console.log(err));
    }
    
    calculateCertificateValidity(){
        let lastVaccineDate
    }

    render(){
        if(this.state.certificate == null){
            return(
                <h1>Loading...</h1>
            )
        } else {
            return (
                <div>
                    <h1>Certificate - Code: {this.state.certficateCode}</h1>
                    <ValidityAlert valid={false} />
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