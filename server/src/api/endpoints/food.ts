import { appRouter } from '../../index';
import { Request, Response } from 'express';
import { foodModel } from '../../db/models';
import { error } from '../../utils/logger';

export default () => {
    appRouter.get('/food/:code', async (req: Request, res: Response) => {
        try {
            // Requête pour récupérer le produit avec le code passé en URL
            const food = await foodModel.findOne({ code: req.params.code }).exec();
            if (food) {
                // Food s'évalue à vrai (non null dans ce cas), on renvoie son contenu sous forme de JSON
                return res.json(food);
            } else {
                // Food est null, on renvoie un message d'erreur clair
                return res.json({
                    'error': `Aucun produit avec le code-barre ${req.params.code} n'a été trouvé.`
                });
            }
        } catch (err) {
            // Erreur autre de la part du serveur
            error(`Erreur lors de la récupération du produit ${req.params.code}:  ${err.toString()}`);
            return res.json({
                'error': 'Erreur inattendue de la part du serveur',
                'msg': err.toString()
            });
        }
    });
};
