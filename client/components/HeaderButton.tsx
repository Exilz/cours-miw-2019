import React, { Component } from 'react';
import classnames from 'classnames';

interface IProps {
    onClick: () => void;
    icon: string;
    active: boolean;
}

export default class HeaderButton extends Component<IProps> {
    render () {
        const classNames = classnames({
            'HeaderButton--container': true,
            'HeaderButton--container-active': this.props.active
        });
        return (
            <div className={classNames} onClick={this.props.onClick}>
                <div className={'HeaderButton--icon-container'}>
                    <i className={`fas ${this.props.icon}`}></i>
                </div>
            </div>
        );
    }
}
