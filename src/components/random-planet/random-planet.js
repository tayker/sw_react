import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './random-planet.css';

export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false
    };

    componentDidMount() {
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, 6000);
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    };

    onPlanetLoaded = (planet) => {
        this.setState({ 
            planet,
            loading: false
        });
    };

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        });
    };

    updatePlanet = () => {
        const id = Math.floor(Math.random()*18) + 2;
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    };

    render() {
        const { planet, loading, error } = this.state;

        const hasData = !(loading || error);

        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? <PlanetView planet={ planet } /> : null;
        const errorMessage = error ? <ErrorIndicator /> : null;

        return (
            <div className="random-planet jumbotron rounded">
                {spinner}
                {content}
                {errorMessage}
            </div>
        )
    };
};

const PlanetView = ({ planet }) => {
    const {  
        id, 
        name, 
        population, 
        rotationPeriod, 
        diameter } = planet;

    return(
        <div className="random-panet-item">
            <img className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                 alt={ name } />
            <div>
                <h4>
                    { name }
                </h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population:</span>
                        <span>{ population }</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation period:</span>
                        <span>{ rotationPeriod }</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter:</span>
                        <span>{ diameter }</span>
                    </li>
                </ul>
            </div>
        </div>
    )
};