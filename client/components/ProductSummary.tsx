import React, { Component } from 'react';
import { fetch, DOMAIN } from '../utils/api';
import { IProduct } from '../pages/Product';
import Link from 'next/link';

interface IProps {
    barCode: string;
}

interface IState {
    error?: boolean;
    product?: IProduct;
}

export default class ProductSummary extends Component<IProps, IState> {

    constructor (props: IProps) {
        super(props);
        this.state = { };
    }

    componentDidMount () {
        this.fetchProduct();
    }

    async fetchProduct () {
        const { barCode } = this.props;
        try {
            const response = await fetch(`${DOMAIN}/food/${barCode}`);
            const product = await response.json();

            if (product && product.code) {
                this.setState({ product });
            } else {
                this.setState({ error: true });
            }
        } catch (err) {
            console.warn(err);
            this.setState({ error: true });
        }
    }

    get content () {
        const { product, error } = this.state;

        if (error) {
            return this.error;
        } else if (!product && !error) {
            return this.loader;
        } else {
            return this.product;
        }
    }

    get error () {
        return (
            <p>Erreur lors de l'affichage du produit</p>
        );
    }

    get loader () {
        return (
            <p>Chargement...</p>
        );
    }

    get product () {
        const { product } = this.state;
        return (
            <div className={'ProductSummary--content-container'}>
                <div className={'ProductSummary--content-name'}>{ product.name }</div>
                <div className={'ProductSummary--content-brand'}>{ product.brand }</div>
            </div>
        );
    }

    render () {
        const { product } = this.state;
        const illustration = product && product.images && product.images.length ?
            `${DOMAIN}/static/images/${product.images[0]}` :
            '/static/images/product.png';

        return (
            <Link href={{ pathname: '/Product', query: { barCode: this.props.barCode } }}>
                <div className={'ProductSummary--container'}>
                    <div className={'ProductSummary--image-container'}>
                        <img src={illustration} />
                    </div>
                    { this.content } 
                </div>
            </Link>
        );
    }
}
