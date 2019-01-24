import clientFetch from 'unfetch';
import serverFetch from 'isomorphic-unfetch';

// On détermine que le code est executé par le serveur si window est indéfini (toujours défini sur les navigateurs).
export const isServer = typeof window === 'undefined';
// On exporte le polyfill de fetch adéquat en fonction de l'environnement (client/serveur).
export const fetch = isServer ? serverFetch : clientFetch;
// Le domaine où est hébergé notre API.
export const DOMAIN = 'http://api.miw.les2cm.eu';
