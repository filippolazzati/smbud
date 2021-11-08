import React, { Component } from "react";
import LocationSearchBar from "./locationSearchBar";
import LocationTypeList from "./locationTypeList";

export default class LocationPage extends Component{
    render(){
        return(
            <div>
                <LocationSearchBar />
                <hr />
                <LocationTypeList />
            </div>
        )
    }
}