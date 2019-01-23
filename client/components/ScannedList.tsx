import React, { Component } from 'react';
import ProductSummary from './ProductSummary';
import { getScannedProducts } from '../utils/scanner';

interface IProps {}
interface IState {
    scannedProducts?: string[];
}

export default class ScannedList extends Component<IProps, IState> {

    constructor (props: IProps) {
        super(props);
        this.state = {};
    }

    componentDidMount () {
        this.setState({ scannedProducts: getScannedProducts() });
    }

    render () {
        const { scannedProducts } = this.state;
        if (!scannedProducts) {
            return null;
        }
        if (scannedProducts && !scannedProducts.length) {
            return (
                <p>Vous n'avez encore scanné aucun produit.</p>
            );
        }

        const products = scannedProducts.map((barCode: string) => {
            return (
                <ProductSummary key={`product-${barCode}`} barCode={barCode} />
            );
        });
        return (
            <div className={'ScannedList--container'}>
                { products }
            </div>
        );
    }
}
