import React, { Component } from "react";

export default class ValidityAlert extends Component {
    render(){
        let expDate = new Date(this.props.expiration).toLocaleDateString("en-GB");
        if(this.props.valid){
            return(
                <div className="alert alert-success">
                    <h4 className="alert-heading">Valid certificate</h4>
                    <p>This certificate is valid and allows access to places and activities where a valid certification is required</p>
                    <hr />
                    <p>Expiration date: {expDate}</p>
                </div>
            )
        } else {
            return(
                <div>
                    <div className="alert alert-danger">
                    <h4 className="alert-heading">Invalid certificate</h4>
                    <p>This certificate is not valid and does not allow access to places and activities where a valid certification is required</p>
                    <hr />
                    <p>Expiration date: {expDate}</p>
                </div>
                </div>
            )
        }
    }
}