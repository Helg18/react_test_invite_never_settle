import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component{
    render() {
        return(
            <footer className="text-white border-bottom-0">
                <span>This app was a test provided by <a href="https://invite.com/" target="_blank"
                                                                        rel="noopener noreferrer">Invite.com</a></span><br/>
                <span>Developed by <a href="mailto:helg18@gmail.com" target="_blank"
                                          rel="noopener noreferrer">Henry Leon</a></span>
            </footer>
        );
    }
}

export default Footer;
