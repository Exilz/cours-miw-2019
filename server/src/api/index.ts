import endpoints from './endpoints/index';
import { success } from '../utils/logger';

export default () => {
    success('API chargée');
    // On boucle sur les endpoints exportés
    endpoints.forEach((loadEndpoint: () => void) => {
        loadEndpoint();
    });
};
