import React, { Component } from 'react';
import ProductHeader from '../components/ProductHeader';
import ProductQualities from '../components/ProductQualities';
import { fetch, DOMAIN } from '../utils/api';
import { storeScannedProduct } from '../utils/scanner';
import Link from 'next/link';

interface IProps {
    product: IProduct;
    barCode?: string;
    error?: 'missingBarcode' | 'productNotFound';
}

export interface IProduct {
    _id: string;
    brand: string;
    code: string;
    images: string[];
    name: string;
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

export default class Product extends Component<IProps> {

    static async getInitialProps(context: any) {
        // On récupère le code barre passé en URL
        const { barCode } = context.query;
        if (!barCode) {
            // S'il manque, on passe les props suivant au composant afin d'afficher un message d'erreur clair
            return { error: 'missingBarcode' };
        }
        // On lance la requête réseau afin de récupérer le produit et on le passe en props.
        try {
            const response = await fetch(`${DOMAIN}/food/${barCode}`);
            const product = await response.json();
            return product.error ? { error: 'productNotFound', barCode } : { product };
        } catch (err) {
            console.warn(err);
            return { error: 'productNotFound' };
        }
    }

    componentDidMount () {
        if (this.props.product) {
            storeScannedProduct(this.props.product.code);
        }
    }

    render () {
        const { product, error, barCode } = this.props;

        // Gestion des 2 cas d'erreur possibles
        if (error === 'missingBarcode') {
            return (
                <div className={'Product--container'}>
                    <p>Code barre manquant</p>
                </div>
            );
        } else if (error === 'productNotFound') {
            return (
                <div className={'Product--container'}>
                    <p>Produit introuvable</p>
                    <p>Désirez-vous <Link href={`/AddProduct?barCode=${barCode}`}><a>ajouter un produit à la base de données</a></Link>?</p>
                </div>
            );
        }

        // Affichage de la page complète avec les 2 sous-composants si le produit a bien été récupéré
        return (
            <div className={'Product--container'}>
                <ProductHeader product={product} />
                <ProductQualities
                  nutrition={product.nutrition}
                  additives={product.additives}
                />
            </div>
        );
    }
}
