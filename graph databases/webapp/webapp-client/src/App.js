import React from "react";
import { Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Navbar from "./components/navbar";
import Homepage from "./components/homepage";
import UserPage from "./components/userPage";
import EditTestDate from "./components/editTestDate";
import BookTest from "./components/bookTest";
import PersonContacts from "./components/personContacts";
import VaccineStats from "./components/vaccineStats";
import PersonPage from "./components/personPage";
import LocationPage from "./components/locationPage";
import LocationsOfType from "./components/locationsOfType";
import LocationInfo from "./components/locationInfo";


const App = () => {
    return (
        <div>
            <Navbar />
            <br />
            <div className="container">
                <Route exact path="/" component={Homepage} />
                <Route exact path="/vaccines" component={VaccineStats} />
                <Route exact path="/users" component={PersonPage} />
                <Route exact path="/locations" component={LocationPage} />
                <Route exact path="/location/:id" component={LocationInfo} />
                <Route exact path="/location/type/:type" component={LocationsOfType} />
                <Route exact path="/user/:id" component={UserPage} />
                <Route exact path="/user/:id/booktest" component={BookTest} />
                <Route exact path="/user/:id/contacts" component={PersonContacts} />
                <Route exact path="/test/:id/editDate" component={EditTestDate} />
            </div>
        </div>
    );
};

export default App;
