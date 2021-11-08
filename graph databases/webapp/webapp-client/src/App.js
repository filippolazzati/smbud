import React from "react";
import { Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import Navbar from "./components/navbar";
import Homepage from "./components/homepage";
import UserPage from "./components/userPage";
import EditTestDate from "./components/editTestDate";
import BookTest from "./components/bookTest";
import PersonContacts from "./components/personContacts";
import VaccineStats from "./components/vaccineStats";


const App = () => {
    return (
        <div>
            <Navbar />
            <br />
            <div className="container">
                <Route exact path="/" component={Homepage} />
                <Route exact path="/vaccines" component={VaccineStats} />
                <Route exact path="/user/:id" component={UserPage} />
                <Route exact path="/user/:id/booktest" component={BookTest} />
                <Route exact path="/user/:id/contacts" component={PersonContacts} />
                <Route path="/user/:id/editTest/:testDate" component={EditTestDate} />
            </div>
        </div>
    );
};

export default App;
