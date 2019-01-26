import React, { Component, FormEvent } from 'react';
import { fetch, DOMAIN } from '../utils/api';

interface IProps {
    barCode?: string;
}

interface IState {
    submitDisabled: boolean;
    submitSuccessful?: boolean;
}

export default class AddProduct extends Component<IProps, IState> {

    constructor (props: IProps) {
        super(props);
        this.state = { submitDisabled: false };
        this.onSubmit = this.onSubmit.bind(this);
    }

    static async getInitialProps(context: any) {
        return { barCode: context.query.barCode };
    }

    async onSubmit (event: FormEvent) {
        event.preventDefault();
        try {
            const { barCode, image } = (event.target as any).elements;
            this.setState({ submitDisabled: true, submitSuccessful: undefined });
            const data = new URLSearchParams();
            for (const element of (event.target as any).elements) {
                data.append(element.name, element.value);
            }
            const request = await fetch(
                `${DOMAIN}/food/insert/${barCode.value}`,
                { method: 'POST', body: data }
            );
            const response = await request.json();
            if (image.files && image.files.length) {
                console.info('files', image.files);
                console.info(`${DOMAIN}/food/insertPhoto/${barCode.value}`);
                const fileData = new FormData();
                fileData.append('photo', image.files[0]);
                const imageUploadRequest = await fetch(
                    `${DOMAIN}/food/insertPhoto/${barCode.value}`,
                    {
                        method: 'POST',
                        // headers: { 'Content-Type': 'multipart/form-data' },
                        body: fileData
                    }
                );
                console.log(imageUploadRequest);
                const imageUploadResponse = await imageUploadRequest.json();
                console.info('imageupoadresponse', imageUploadResponse);
            }
            if (response && response.status === 'ok') {
                this.setState({ submitSuccessful: true });
            } else if (response &&  response.status !== 'ok' || response.error) {
                this.setState({ submitDisabled: false, submitSuccessful: false });
            }
        } catch (err) {
            console.warn(err);
            this.setState({ submitDisabled: false, submitSuccessful: false });
        }
    }

    get submitResult () {
        const { submitSuccessful } = this.state;
        if (typeof submitSuccessful === 'undefined') {
            return null;
        }
        return (
            <div className={`AddProduct--result ${submitSuccessful ? 'success' : 'fail'}`}>
                { submitSuccessful ? 'Produit inséré avec succès' : "Erreur lors de l'insertion du produit" }
            </div>
        );
    }

    render () {
        const { barCode } = this.props;
        const { submitDisabled } = this.state;
        return (
            <div className={'AddProduct--container'}>
                <div className={'AddProduct--title'}>Ajouter un produit manquant</div>

                <form onSubmit={this.onSubmit}>
                    <div><input type={'number'} name={'barCode'} placeholder={'Code barre* : '} defaultValue={barCode} required /></div>
                    <div><input type={'text'} name={'name'} placeholder={'Nom* : '} /></div>
                    <div><input type={'text'} name={'brand'} placeholder={'Marque* : '} /></div>
                    <div><input type={'text'} name={'additives'} placeholder={'Additifs (séparés par une virgule) : '} /></div>
                    <div><input type={'number'} name={'fibers'} placeholder={'Fibres* (pour 100g) : '} /></div>
                    <div><input type={'number'} name={'proteins'} placeholder={'Protéines* (pour 100g) : '} /></div>
                    <div><input type={'number'} name={'sugar'} placeholder={'Sucre* (pour 100g) : '} /></div>
                    <div><input type={'number'} name={'saturatedFats'} placeholder={'Graisses saturées* (pour 100g) : '} /></div>
                    <div><input type={'number'} name={'calories'} placeholder={'Calories* (kJ pour 100g) : '} /></div>
                    <div><input type={'number'} name={'salt'} placeholder={'Sel* (pour 100g) : '} /></div>
                    <div><input type={'file'} name={'image'} placeholder={'Illustration'} /></div>
                    { this.submitResult }
                    <button type={'submit'} disabled={submitDisabled} >CONTRIBUER</button>
                </form>
            </div>
        );
    }
}
