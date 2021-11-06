import React, { Component } from "react";
import UserInfo from "./userInfo";

export default class UserPage extends Component{
    render(){
        return(
            <div>
                <div className="row">
                    <div className="col">
                        <h1>User overview</h1> 
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-danger btn-lg float-end">Book a test</button>
                    </div>
                </div>
                
                <br />
                <UserInfo id={this.props.match.params.id}/>    
            </div>
        )
    }
}