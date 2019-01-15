import React from 'react';
import App, { Container } from 'next/app';
import '../styles/main.scss';

export default class MyApp extends App {

    // Configuration spécifique à next récupérée sur la documentation.
    // https://github.com/zeit/next.js/#custom-app
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps(ctx);
        }
        return { pageProps };
    }

    render () {
        return (
            <Container>
                <p>PWA !</p>
            </Container>
        );
    }
}
