import React, { Component } from 'react';

import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './people-page.css';
import ErrorIndicator from '../error-indicator';

import SwapiService from '../../services/swapi-service';

const Row = ({ left, right }) => {
    return (
        <div className="row mb-2">
            <div className="col-md-6">
                { left }
            </div>
            <div className="col-md-6">
                { right }
            </div>
        </div>
    )
};

export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        personId: 4,
        hasError: false
    };

    componentDidCatch() {
        this.setState({ hasError: true });
    };

    onItemSelected = (id) => {
        this.setState({
            personId: id
        });
    };

    render() {
        if(this.state.hasError) {
            return <ErrorIndicator />
        }

        const itemList = (
            <ItemList onItemSelected={ this.onItemSelected }
                      getData={ this.swapiService.getAllPeople }
                      renderItem={(item) => `${item.name} (${item.gender}, ${item.birthYear})`} />
        );
        
        const personDetails = (
            <PersonDetails personId={ this.state.personId } />
        );

        return (
            <Row left={ itemList } right={ personDetails } />
        )
    };
};