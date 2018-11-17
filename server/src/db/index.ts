import * as mongoose from 'mongoose';
import { success, error, info } from '../utils/logger';

// Référence à notre connexion à la base de données
export let db: mongoose.Connection;

// Simple fonction de connexion à la base
function connect (): void {
    mongoose.connect(process.env.MONGO_URL, { autoReconnect: true, useNewUrlParser: true });
}

export default () => {
    return new Promise((resolve, reject) => {
        if (!process.env.MONGO_URL) {
            // On commence par vérifier la présence de la variable d'environnement MONGO_URL
            error("Veuillez renseigner la variable d'environnement MONGO_URL et redémarrer le serveur.");
            // En cas d'absence, on arrête le serveur
            process.exit(1);
        }

        // Configuration de mongoose pour fonctionner avec des promesses plutôt que d'utiliser des callbacks
        (mongoose as any).Promise = global.Promise;
        // On assigne notre connexion à la base à la variable "db" exportée plus haut
        db = mongoose.connection;

        // On écoute les différents événements émis par mongoose
        db.on('connecting', () => {
            info('Connexion à MongoDB...');
        });
        db.on('error', (err: any) => {
            error(err);
            mongoose.disconnect();
        });
        db.once('open', () => {
            success('Connecté à MongoDB !');
            // On résout la promesse
            return resolve();
        });
        db.on('disconnected', () => {
            // Tentative péridioque de reconnexion si nous avons été déconnecté de la base de données
            setTimeout(() => {
                try {
                    connect();
                } catch (err) {
                    error(`Impossible de se reconnecter à MongoDB : ${err}`);
                }
            }, 5000);
        });

        // Enfin, on lance la connexion
        connect();
    });
};
