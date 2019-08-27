import React, { Component } from 'react';

// Css
import './Body.css';

// Sub-components
import Table from "./Table/Table";

class Body extends Component {

    // Render component
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Players Available</h4>
                            </div>
                            <div className="card-body">
                                <Table />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Exporting main class Body
export default Body;
