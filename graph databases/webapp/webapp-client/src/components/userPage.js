import React, { Component } from "react";
import { Link } from "react-router-dom";
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
                        <Link to={"/user/" + this.props.match.params.id + "/contacts"}>
                            <button type="button" className="btn btn-danger btn-lg mr-1">List of contacts</button>
                        </Link>
                        <div className="float-end">
                            <Link to={"/user/" + this.props.match.params.id + "/booktest"}>
                                <button type="button" className="btn btn-danger btn-lg">Book a test</button>
                            </Link>
                        </div>
                    </div>
                </div>
                
                <br />
                <UserInfo id={this.props.match.params.id}/>    
            </div>
        )
    }
}