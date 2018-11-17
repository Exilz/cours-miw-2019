import endpoints from './endpoints/index';
import db from '../db/index';
import { success } from '../utils/logger';

export default async () => {
    await db();
    // On boucle sur les endpoints exportés
    endpoints.forEach((loadEndpoint: () => void) => {
        loadEndpoint();
    });
    success('API chargée');
};
