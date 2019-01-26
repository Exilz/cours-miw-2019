import React from 'react';
import App, { Container } from 'next/app';
import Header from '../components/Header';
import ScanButton from '../components/ScanButton';
import '../styles/main.scss';

export default class MyApp extends App {

    constructor (props: any) {
        super(props);
        // L'index de la vue active est stockée dans le state au plus haut niveau de l'application
        this.state = { activeViewIndex: 0 };
        this.onChangeActiveView = this.onChangeActiveView.bind(this);
    }

    // Configuration spécifique à next récupérée sur la documentation.
    // https://github.com/zeit/next.js/#custom-app
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps(ctx);
        }
        return { pageProps };
    }

    onChangeActiveView (index: number) {
        this.setState({ activeViewIndex: index });
    }

    render () {
        const { Component, pageProps, router } = this.props;
        return (
            <Container>
                <Header
                  activeViewIndex={this.state.activeViewIndex}
                  onChangeActiveView={this.onChangeActiveView}
                  route={router.route}
                />
                <div className={'App--content-container'}>
                    <Component {...pageProps} activeViewIndex={this.state.activeViewIndex} />
                </div>
                <ScanButton route={router.route}/>
            </Container>
        );
    }
}
