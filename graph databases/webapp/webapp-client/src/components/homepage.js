import React, { Component } from "react";
import PersonSearchBar from "./personSearchBar";
import LocationSearchBar from "./locationSearchBar";

export default class Homepage extends Component{
    render(){
        return(
            <div className="row">
                <div className="col">
                    <PersonSearchBar />
                </div>
                <div className="col">
                    <LocationSearchBar />
                </div>
            </div>
        )
    }
}