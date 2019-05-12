import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';

import Spinner from '../spinner';

import './person-details.css';
import ErrorButton from '../error-button';

export default class PersonDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person: null,
        loading: false
    };

    componentDidMount() {
        this.updateItem();
    };

    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId) {
            this.updateItem();
        }
    };

    updateItem() {
        const { personId } = this.props;
        if(!personId) {
            return;
        };
        this.setState({
            loading: true
        });
        this.swapiService
            .getPerson(personId)
            .then((person) => {
                this.setState({ person, loading: false });
            });
    };

    render() {

        if(!this.state.person) {
            return <span>Select a person from list!</span>
        }

        if(this.state.loading) {
            return <Spinner />
        }

        const { id, name, gender,
                birthYear, eyeColor } = this.state.person;
        const eyeColorStyle = {
            color: eyeColor
        };

        return (
            <div className="person-details card">
                <img className="person-image"
                     src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                     alt={ name } />

                <div className="card-body">
                    <h4>
                        { name }
                    </h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{ gender }</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>{ birthYear }</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye color</span>
                            <span style={ eyeColorStyle }>{ eyeColor }</span>
                        </li>
                    </ul>
                    <ErrorButton />
                </div>
            </div>
        )
    };
};