import React, {Component} from 'react';

// Css
import './Table.css'

// Services
import API from '../../../services/axios';

class Table extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: '',
            players: [],
            positions: [],
            selectedPosition: '',
            selectedPlayers: [],
        };
        this.fetchPlayers();

        this.onSubmit = this.onSubmit.bind(this);
    }

    // Fetch player from external resource
    async fetchPlayers() {
        let results = await API.getAll().then(data => {
                return data;
            }
        );
        this.setState({
            selectedPlayers: results
        });
        this.setState({
            players: results
        });
    }

    // Set Player List
    playerList(){
        const players = this.state.selectedPlayers;
        return players.map(d => {
            this.putPositionInList( d['position'] );
            return <tr key={ d['jerseyNumber'] }>
                <td>{ d['name'] }</td>
                <td>{ d['position'] }</td>
                <td>{ d['nationality'] }</td>
                <td>{ Table.ageCalculator( d['dateOfBirth'] ) }</td>
            </tr>;
        });
    }

    // Put a position into positions array
    putPositionInList(position) {
        this.state.positions.push(position);
    }

    // Build a options to put on select input
    positionList() {
        let positions = Array.from(new Set(this.state.positions));

        positions.unshift([]);

        return positions.map(position => {
           return <option key={ position } value={ position }>{ position }</option>
        });
    }

    // Calculate the age of each player using your dob (date of birth)
    static ageCalculator(dob) {
        const today = new Date();
        const birthDate = new Date(dob);
        let age_now = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
        { age_now--; }
        return age_now;
    }

    // Clear form
    clearForm = () => {
        this.setState({
            selectedPlayers: this.state.players,
            name:'',
            age:'',
            selectedPosition:''
        })
    };

    // Submit form
    onSubmit(e) {
        e.preventDefault();
        this.setState({
            name: this.refs.name.value,
            age: this.refs.age.value,
            selectedPosition: this.refs.position.value,
            selectedPlayers: this.state.players
        });

        // Filter by name
        this.filterByName(this.refs.name.value);

        // Filter by Position
        this.filterByPosition(this.refs.position.value);

        // Filter by age
        this.filterByAge(this.refs.age.value)
    }

    // Filter by name on selected Players
    filterByName(name) {
        // return null if name is empty
        if (name === '') {
            return null;
        }

        let players = this.state.players.filter(p => {
            return p.name.toLowerCase().includes(name.toLowerCase())
        });
        this.setState({
            selectedPlayers: players
        });

    }

    // Filter by position on selected players
    filterByPosition(position) {
        // return null if position is empty
        if (position === '') {
            return null;
        }

        let players = this.state.selectedPlayers.filter(p => {
            return position.toString().toLowerCase() === p.position.toString().toLowerCase();
        });
        this.setState({
            selectedPlayers: players
        });

    }

    // Filter by age on selected players
    filterByAge(age) {
        // return null if age is empty
        if (age === '') {
            return null;
        }

        let players = this.state.selectedPlayers.filter(a => {
            return age === Table.ageCalculator(a.dateOfBirth).toString()
        });
        this.setState({
            selectedPlayers: players
        });

    }

    // Render component
    render() {
        // Get Lists
        const list = this.playerList();
        const positions = this.positionList();

        // Render component
        return(
            <div>
                <div className="row mb-4">
                    <form className="container form-player" onSubmit={this.onSubmit}>
                        <div className="col-sm-12 col-md-3 col-xl-3 col-lg-3 p-2">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Player name" ref="name" pattern="[a-zA-Z]*"/>
                                <label className="annotation">Must be String</label>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3 col-xl-3 col-lg-3 p-2">
                            <div className="form-group">
                                <select className="form-control" placeholder="Position" ref="position">
                                    { positions }
                                </select>
                                <label className="annotation">Must be listed</label>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3 col-xl-3 col-lg-3 p-2">
                            <div className="form-group">
                                <input type="number" className="form-control" placeholder="Age" ref="age" min="18" max="45" pattern="[0-9]*"/>
                                <label className="annotation">Must be numeric between 18 - 45</label>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3 col-xl-3 col-lg-3 p-2">
                            <button type="reset" className="btn btn-outline-danger mr-2" onClick={this.clearForm}>Clear Fields</button>
                            <button type="submit" className="btn btn-outline-info">Search</button>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <p className="showing-results col-sm-12 col-md-3 offset-md-9">
                        Showing { this.state.selectedPlayers.length } results  of { this.state.players.length }
                    </p>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>

                            <tr>
                                <td className="col-with-quarter"> Player</td>
                                <td className="col-with-quarter"> Position</td>
                                <td className="col-with-quarter"> Nationality</td>
                                <td className="col-with-quarter"> Age</td>
                            </tr>
                            </thead>
                            <tbody>
                            { list }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

// Exporting Main class Table
export default Table;
