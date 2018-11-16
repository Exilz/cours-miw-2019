import { appRouter } from '../../index';
import { Request, Response } from 'express';

export default () => {
    appRouter.get('/food/:code', (req: Request, res: Response) => {
        return res.json({
            '_id': 'id-aliment',
            'exemple': `exemple de JSON pour l'aliment ${req.params.code}`
        });
    });
};
