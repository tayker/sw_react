import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import SwapiService from '../../services/swapi-service';

import './app.css';

export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
        hasError: false
    };

    componentDidCatch() {
        this.setState({ hasError: true });
    };

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };
    
    render() {

        if(this.state.hasError) {
          return <ErrorIndicator />  
        };

        const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;
        return (
            <div className="container">
                <Header />
                { planet }
                <div className="row button-row">
                    <button
                        className="toggle-planet btn btn-warning btn-lg"
                        onClick={ this.toggleRandomPlanet }>
                        Toggle Random Planet
                    </button>
                    <ErrorButton />
                </div>
                <PeoplePage />
                <div className="row mb-2">
                    <div className="col-md-6">
                        <ItemList onItemSelected={ this.onItemSelected }
                                  getData={ this.swapiService.getAllPlanets }
                                  renderItem={(item) => (<span>{item.name}<button>!</button></span>)} />
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={ this.state.personId } />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-6">
                        <ItemList onItemSelected={ this.onItemSelected }
                                  getData={ this.swapiService.getAllStarships }
                                  renderItem={(item) => `${item.name} (${item.diameter})`} />
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={ this.state.personId } />
                    </div>
                </div>
            </div>
        )
    };
};