import { appRouter } from '../index';
import { Request, Response } from 'express';

export default () => {
    console.log('API chargée');
    // On rajoute une route sur "/"
    appRouter.get('/', (req: Request, res: Response) => {
        // Le serveur renvoie une chaîne de caractères
        return res.send('Home');
    });
    appRouter.post('/test', (req: Request, res: Response) => {
        console.log(req.body);
        return res.send('ok');
    });
};
