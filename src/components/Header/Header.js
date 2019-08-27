import React, { Component } from "react";
import './Header.css';

// Logo
import logo from './../../logo.svg';

class Header extends Component{
    render() {
        return(
            <nav className="navbar navbar-expand-lg mb-3">
                <div className="navbar-brand text-capitalize text-light">
                    <img width="60vh" src={logo} className="App-logo" alt="logo" />
                    Football Player list
                </div>
            </nav>
        );
    }
}

export default Header;
