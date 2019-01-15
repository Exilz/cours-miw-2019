import Document, { Head, Main, NextScript } from 'next/document';

// Configuration de l'en-tête HTML de nos pages : balise head, injection des styles...
// On utilise FontAwesome et Google Fonts via un CDN pour faciliter l'intégration.
export default class MyDocument extends Document {

    render() {
        return (
            <html>
                <Head>
                    <meta name='theme-color' content='#14b45a' />
                    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                    <link rel='stylesheet' href='/_next/static/style.css' />
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossOrigin="anonymous"></link>
                    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
