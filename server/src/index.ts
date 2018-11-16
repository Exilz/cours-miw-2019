import * as express from 'express';
import api from './api/index';

// Instantiation du framework express
const app = express();

export default () => {
    app.listen(8080, () => {
        // On fait écouter notre serveur sur le port 8080 et on passe un callback
        // exécuté lorsque le serveur est prêt à recevoir des requêtes.
        console.log('Serveur démarré !');
    });
};
