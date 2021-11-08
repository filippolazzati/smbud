import React, { Component } from "react";
import PersonSearchBar from "./personSearchBar";
import UserList from "./userList";

export default class PersonPage extends Component{
    render(){
        return(
            <div>
                <PersonSearchBar />
                <hr />
                <UserList />
            </div>
        )
    }
}