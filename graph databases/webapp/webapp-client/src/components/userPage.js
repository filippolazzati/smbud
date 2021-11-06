import React, { Component } from "react";
import UserInfo from "./userInfo";

export default class UserPage extends Component{
    render(){
        return(
            <div>
                <h1>User overview</h1>
                <br />
                <div className="row">
                    <div className="col">
                        <UserInfo id={this.props.match.params.id}/>
                    </div>
                    <div className="col">
                        <h3>Tests</h3>
                    </div>
                </div>
            </div>
        )
    }
}