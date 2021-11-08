import React, { Component } from "react";
import PersonSearchBar from "./personSearchBar";
import LocationSearchBar from "./locationSearchBar";
import UserList from "./userList";
import LocationTypeList from "./locationTypeList";


export default class Homepage extends Component{
    render(){
        return(
            <div className="row">
                <div className="col">
                    <PersonSearchBar />
                    <hr />
                    <UserList />
                </div>
                <div className="col">
                    <LocationSearchBar />
                    <hr />
                    <LocationTypeList />
                </div>
            </div>
        )
    }
}