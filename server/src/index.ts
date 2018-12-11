import * as express from 'express';
import * as bodyParser from 'body-parser';
import api from './api/index';
import { success } from './utils/logger';

// Instantiation du framework express
const app = express();
// Instantiation du routeur
export const appRouter = express.Router();
app.use(appRouter);
// Configuration de body-parser afin de récupérer les paramètres POST
appRouter.use(bodyParser.urlencoded({ extended: true }));
// On "sert" les fichiers présents dans le dossier "static", comme les images
appRouter.use('/static', express.static('static'));

export default () => {
    app.listen(8080, () => {
        // On fait écouter notre serveur sur le port 8080 et on passe un callback
        // exécuté lorsque le serveur est prêt à recevoir des requêtes.
        success('Serveur démarré !');
        api();
    });
};
