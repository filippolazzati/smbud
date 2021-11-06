import React from "react";
import { Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import Navbar from "./components/navbar";
import Homepage from "./components/homepage";
import UserPage from "./components/userPage";


const App = () => {
    return (
        <div>
            <Navbar />
            <br />
            <div className="container">
                <Route exact path="/" component={Homepage} />
                <Route path="/user/:id" component={UserPage} />
            </div>
        </div>
    );
};

export default App;
