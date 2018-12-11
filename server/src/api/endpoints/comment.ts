import { appRouter } from '../../index';
import { Request, Response } from 'express';
import { commentModel } from '../../db/models';
import { foodExists } from './food';
import { error } from '../../utils/logger';

export default () => {
    // Récupération de liste des commentaires pour un produit
    appRouter.get('/comment/:foodcode', async (req: Request, res: Response) => {
        try {
            // On commence par vérifier que le produit existe afin de pouvoir chercher ses commentaires associés
            const exists = await foodExists(req.params.foodcode);
            if (!exists) {
                return res.status(404).json({ status: 'fail', message: `Le produit ${req.params.foodcode} n'existe pas.` });
            }

            const comments = await commentModel.find({ code: req.params.foodcode });
            return res.json({ status: 'ok', comments });
        } catch (err) {
            // Erreur autre de la part du serveur
            error(`Erreur lors de l'ajout d'un commande sur le produit ${req.params.foodcode}: ${err.toString()}`);
            return res.status(500).json({
                'error': 'Erreur inattendue de la part du serveur',
                'msg': err.toString()
            });
        }
    });

    // Ajout d'un commentaire en base de données
    appRouter.post('/comment/insert/:foodcode', async (req: Request, res: Response) => {
        try {
            // On commence par vérifier que le produit existe afin de pouvoir lui attacher un commentaire
            const exists = await foodExists(req.params.foodcode);
            if (!exists) {
                return res.status(404).json({ status: 'fail', message: `Le produit ${req.params.foodcode} n'existe pas.` });
            }

            // Déconstruction des paramètres passés dans la requête POST
            const { name, message } = req.body;

            // On vérifie que les paramètres requis sont spécifiés
            if (!name || !message) {
                return res.status(403).json({ status: 'fail', message: 'Certains paramètres sont manquants.' });
            }

            // Pour faire une insertion, on utilise le mot-clé "new" devant notre modèle et on lui passe en paramètre
            // la valeur de ses champs.
            const request = new commentModel({
                date: Date.now(), // timestamp (int)
                code: req.params.foodcode,
                name,
                message
            });
            // Et on lance l'enregistrement en base de données
            const inserted = await request.save();

            if (inserted && inserted._id) {
                // Si l'insertion a bien retourné le nouveau document inséré, on notifie l'utilisateur dans la requête
                return res.json({
                    'status': 'ok',
                    message: `Commentaire pour l'article ${req.params.foodcode} inséré avec succès.`
                });
            } else {
                return res.status(500).json({ 'status': 'fail', message: "Le commentaire n'a pas pu être inséré." });
            }
        } catch (err) {
            // Erreur autre de la part du serveur
            error(`Erreur lors de l'ajout d'un commande sur le produit ${req.params.foodcode}: ${err.toString()}`);
            return res.status(500).json({
                'error': 'Erreur inattendue de la part du serveur',
                'msg': err.toString()
            });
        }
    });
};
