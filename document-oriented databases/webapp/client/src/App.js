import React from "react";
import { Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Navbar from "./components/navbar";
import Homepage from "./components/homepage";
import Certificate from "./components/certificate";
import CertificateList from "./components/certificatelist";
import LocationList from "./components/locationlist";
import LocationInfo from "./components/locationinfo";
import InsertVaccination from "./components/insertvaccination";
import InsertTest from "./components/inserttest";

const App = () => {
    return (
        <div>
            <Navbar />
            <br />
            <div className="container">
                <Route exact path="/" component={Homepage} />
                <Route exact path="/certificates" component={CertificateList} />
                <Route exact path="/certificate/:id" component={Certificate} />
                <Route exact path="/certificate/:id/addVaccine" component={InsertVaccination} />
                <Route exact path="/certificate/:id/addTest" component={InsertTest} />
                <Route exact path="/locations" component={LocationList} />
                <Route exact path="/location/:id" component={LocationInfo} />
            </div>
        </div>
    );
};

export default App;
