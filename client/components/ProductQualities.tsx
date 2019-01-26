import React, { Component } from 'react';
import { getQualityDetails } from '../utils/quality';

export type QualityType = 'proteins' | 'fibers' | 'saturatedFats' | 'sugar' | 'salt' | 'additives' | 'calories';
interface IProps {
    additives?: string[];
    nutrition: {
        calories: number;
        fibers: number;
        proteins: number;
        salt: number;
        saturatedFats: number;
        sugar: number;
    };
}

const QUALITIES = {
    proteins: {
        label: 'Protéines',
        icon: 'fa-fish'
    },
    fibers: {
        label: 'Fibres',
        icon: 'fa-leaf'
    },
    saturatedFats: {
        label: 'Graisses saturées',
        icon: 'fa-tint'
    },
    sugar: {
        label: 'Sucre',
        icon: 'fa-candy-cane'
    },
    salt: {
        label: 'Sel',
        icon: 'fa-cube'
    },
    additives: {
        label: 'Additifs',
        icon: 'fa-atom'
    },
    calories: {
        label: 'Calories',
        icon: 'fa-fire'
    }
};

export default class ProductQualities extends Component<IProps> {

    renderItem (quality: QualityType) {
        const { nutrition } = this.props;
        const value: number = (nutrition as any)[quality];
        if (!value) {
            return null;
        }
        const qualityDetails = getQualityDetails(quality, value);
        return (
            <div className={'ProductQualities--list-item'}>
                <div className={'ProductQualities--list-item-icon'}>
                    <i className={`fas ${QUALITIES[quality].icon}`} />
                </div>
                <div className={'ProductQualities--list-item-desc'}>
                    <div className={'ProductQualities--list-item-desc-label'}>{ QUALITIES[quality].label }</div>
                    <div className={'ProductQualities--list-item-desc-quality'}>{ qualityDetails.label }</div>
                </div>
                <div className={'ProductQualities--list-item-value'}>
                    <div className={'ProductQualities--list-item-value-number'}>{ value }g</div>
                    <div className={`ProductQualities--list-item-value-circle ${qualityDetails.quality}`} />
                </div>
            </div>
        );
    }

    renderAdditives () {
        const { additives } = this.props;
        const label = additives && additives.length ? additives.join(', ') : 'Aucun additif présent';
        return (
            <div className={'ProductQualities--list-item'}>
                <div className={'ProductQualities--list-item-icon'}>
                    <i className={'fas fa-atom'} />
                </div>
                <div className={'ProductQualities--list-item-desc last'}>
                    <div className={'ProductQualities--list-item-desc-label'}>Additifs</div>
                    <div className={'ProductQualities--list-item-desc-quality'}>{ label }</div>
                </div>
            </div>
        );
    }

    render () {
        return (
            <div className={'ProductQualities--container'}>
                <div className={'ProductQualities--header'}>
                    <div className={'ProductQualities--header-qualities'}>Qualités</div>
                    <div className={'ProductQualities--header-quantity'}>pour 100g</div>
                </div>
                <div className={'ProductQualities--list-container'}>
                    { this.renderItem('proteins') }
                    { this.renderItem('fibers') }
                    { this.renderItem('saturatedFats') }
                    { this.renderItem('sugar') }
                    { this.renderItem('salt') }
                    { this.renderItem('calories') }
                    { this.renderAdditives() }
                </div>
            </div>
        );
    }
}
