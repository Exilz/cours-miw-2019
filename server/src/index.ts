import * as express from 'express';
import * as bodyParser from 'body-parser';
import api from './api/index';

// Instantiation du framework express
const app = express();
// Instantiation du routeur
export const appRouter = express.Router();
app.use(appRouter);
// Configuration de body-parser afin de récupérer les paramètres POST
appRouter.use(bodyParser.urlencoded({ extended: true }));

export default () => {
    app.listen(8080, () => {
        // On fait écouter notre serveur sur le port 8080 et on passe un callback
        // exécuté lorsque le serveur est prêt à recevoir des requêtes.
        console.log('Serveur démarré !');
        api();
    });
};
