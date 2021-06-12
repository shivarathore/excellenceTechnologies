import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./navbar";
import Home from "./home";

class MainComponent extends Component{
    render(){
        return (
            <React.Fragment>
                <NavBar />
                <Switch>
                    <Route path="/users" component={Home} />
                    <Redirect from="/" to="/users" />
                </Switch>
            </React.Fragment>
        );
    }
}
export default MainComponent;