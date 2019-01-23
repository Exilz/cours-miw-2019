import React, { Component } from 'react';
import Router from 'next/router';

interface IProps {
    route: string;
}

export default class ScanButton extends Component<IProps> {

    openScanner () {
        Router.push('/Scanner');
    }

    render () {
        if (this.props.route !== '/') {
            return null;
        }
        return (
            <div className={'ScanButton--container'} onClick={this.openScanner}>
                <div className={'ScanButton--icon'}>
                    <i className={'fas fa-barcode'}></i>
                </div>
            </div>
        );
    }
}
