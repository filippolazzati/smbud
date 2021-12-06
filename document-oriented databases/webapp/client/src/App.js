import React from "react";
import { Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Navbar from "./components/navbar";
import Homepage from "./components/homepage";
import Certificate from "./components/certificate";

const App = () => {
    return (
        <div>
            <Navbar />
            <br />
            <div className="container">
                <Route exact path="/" component={Homepage} />
                <Route exact path="/certificate/:id" component={Certificate} />
            </div>
        </div>
    );
};

export default App;
