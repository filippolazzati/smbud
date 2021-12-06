import React, { Component } from "react";
import SearchCode from "./searchcode";

export default class Homepage extends Component{
    render(){
        return(
            <div>
                <h1>COVID-19 Certification App</h1>
                <p className="lead">This webapp implements a platform to verify COVID-19 certificates.</p>
                <hr />
                <SearchCode />
            </div>
        )
    }
}