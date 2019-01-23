import React, { Component } from 'react';
import { DOMAIN } from '../utils/api';
import { IProduct } from '../pages/Product';
import { getOverallQuality } from '../utils/quality';

interface IProps {
    product: IProduct;
}

export default class ProductHeader extends Component<IProps> {
    render () {
        const { images } = this.props.product;
        const overallQuality = getOverallQuality(this.props.product);
        let illustration = '/static/images/product.png';
        if (images && images.length && images[0]) {
            illustration = `${DOMAIN}/static/images/${images[0]}`;
        }

        return (
            <div className={'ProductHeader--container'}>
                <div className={'ProductHeader--image-container'}>
                    <img src={illustration} />
                </div>
                <div className={'ProductHeader--rightCol'}>
                    <div className={'ProductHeader--title'}>{ this.props.product.name }</div>
                    <div className={'ProductHeader--brand'}>{ this.props.product.brand }</div>
                    <div className={'ProductHeader--overall-container'}>
                        <div className={'ProductHeader--overall-circle-container'}>
                            <div className={`ProductQualities--list-item-value-circle ${overallQuality.label}`} />
                        </div>
                        <div className={'ProductHeader--overall-value-container'}>
                            <div className={'ProductHeader--overall-value'}>{ overallQuality.value } / 100</div>
                            <div className={'ProductHeader--overall-label'}>{ overallQuality.label }</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
