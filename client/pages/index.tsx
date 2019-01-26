import React, { Component } from 'react';
import ScannedList from '../components/ScannedList';
import AlternativesList from '../components/AlternativesList';
import QualitySummary from '../components/QualitySummary';

interface IProps {
    activeViewIndex: number;
}

// Composant "Home" rendu sur la route "/" par le routeur de next.
// Le composant adéquat sera rendu en fonction du bouton actif dans le header.
export default class Home extends Component<IProps> {

    render () {
        switch (this.props.activeViewIndex) {
            case 0: return <ScannedList />;
            case 1: return <AlternativesList />;
            case 2: return <QualitySummary />;
            default: return <ScannedList />;
        }
    }
}
