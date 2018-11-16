import { appRouter } from '../../index';
import { Request, Response } from 'express';

export default () => {
    appRouter.get('/comment/:foodcode', (req: Request, res: Response) => {
        return res.json({
            'comments': [
                {
                    '_id': 'id-commentaire-1',
                    'content': 'Exemple de commentaire'
                }
            ]
        });
    });
};
