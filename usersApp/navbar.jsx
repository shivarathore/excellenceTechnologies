import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component{
    render(){
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">UsersApp</Link>
            </nav>
        );
    }
}
export default NavBar;