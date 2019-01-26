import React, { Component, Fragment } from 'react';
import HeaderButton from './HeaderButton';
import Router from 'next/router';

interface IProps {
    activeViewIndex: number;
    onChangeActiveView: (index: number) => void;
    route: string;
}

export default class Header extends Component<IProps> {

    renderButton (index: number, icon: string) {
        return (
            <HeaderButton
              icon={icon}
              onClick={() => this.props.onChangeActiveView(index)}
              active={this.props.activeViewIndex === index}
          />
        );
    }

    get defaultHeader () {
        return (
            <Fragment>
                { this.renderButton(0, 'fa-carrot') }
                { this.renderButton(1, 'fa-exchange-alt') }
                { this.renderButton(2, 'fa-chart-pie') }
            </Fragment>
        );
    }

    get backHeader () {
        return (
            <HeaderButton
              icon={'fa-arrow-left'}
              onClick={() => Router.replace('/')}
              active={false}
            />
        );
    }

    get header () {
        switch (this.props.route) {
            case '/Product':
            case '/AddProduct': return this.backHeader;
            case '/Scanner': return null;
            default: return this.defaultHeader;
        }
    }

    render () {
        return (
            <header className={'Header--container'}>
                { this.header }
            </header>
        );
    }
}
