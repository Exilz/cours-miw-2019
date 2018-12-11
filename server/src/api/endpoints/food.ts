import * as multer from 'multer';
import * as fs from 'fs';
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
                return res.status(404).json({
                    'error': `Aucun produit avec le code-barre ${req.params.code} n'a été trouvé.`
                });
            }
        } catch (err) {
            // Erreur autre de la part du serveur
            error(`Erreur lors de la récupération du produit ${req.params.code}:  ${err.toString()}`);
            return res.status(500).json({
                'error': 'Erreur inattendue de la part du serveur',
                'msg': err.toString()
            });
        }
    });

    appRouter.post('/food/insert/:code', async (req: Request, res: Response) => {
        try {
            const insertionResult = await foodModel.updateOne(
                { _id: req.params.code },
                formatFood(req.body, req.params.code),
                { upsert: true }
            );
            if (insertionResult.ok > 0) {
                return res.json({ 'status': 'ok', 'message': `Produit ${req.params.code} inséré avec succès.` });
            } else {
                return res.status(500).json({ 'status': 'fail', 'message': "Le produit n'a pas pu être inséré." });
            }
        } catch (err) {
            // Erreur autre de la part du serveur
            error(`Erreur lors de l'ajout du produit ${req.params.code}: ${err.toString()}`);
            return res.status(500).json({
                'error': 'Erreur inattendue de la part du serveur',
                'msg': err.toString()
            });
        }
    });

    // Configuration de la récupération du fichier binaire depuis le formulaire
    // Ici : un seul champ "photo" accepté, le reste ne sera pas pris en compte par soucis de sécurité
    const formConfig = multer().single('photo');
    appRouter.post('/food/insertPhoto/:code', formConfig, async (req: any, res: Response) => {
        try {
            if (!foodExists(req.params.code)) {
                return res.status(404).json({ status: 'fail', message: `Le produit ${req.params.code} n'existe pas.` })
            }
            if (!req.file) {
                // Le fichier est manquant
                return res.status(403).json({ 'status': 'fail', 'message': 'Champ photo manquant.' });
            }
            // Déconstruction des valeurs qui nous intéressent dans le fichier envoyé
            const { originalname, mimetype, buffer, size } = req.file;

            // Vérification du type de fichier
            if (!isFileTypeValid(mimetype)) {
                return res.status(403).json({ 'status': 'fail', 'message': 'Format du fichier incorrect. (png, jpg, jpeg acceptés)' });
            }
            // Vérification de la taille du fichier
            if (!isFileSizeValid(size)) {
                return res.status(403).json({ 'status': 'fail', 'message': 'Fichier trop lourd. (maximum 3Mo)' });
            }

            // A partir d'ici, on considère que le fichier est valide. On peut alors le sauvegarder sur le serveur.
            // Le chemin est relatif au dossier d'exécution du serveur, pas du fichier courant.
            const fileName = `${Date.now()}-${originalname}`;
            fs.writeFile(`./static/images/${fileName}`, buffer, async (err) => {
                if (err) {
                    return res.status(500).json({ 'status': 'fail', message: "Erreur lors de l'envoi du fichier." });
                }
                // On ajoute l'image dans la base de données
                await foodModel.findOneAndUpdate(
                    { code: req.params.code },
                    { $push: { images: fileName } }
                );
                return res.json({ status: 'success', message: 'Image envoyée avec succès' });
            });
        } catch (err) {
            // Erreur autre de la part du serveur
            error(`Erreur lors de l'ajout du produit ${req.params.code}: ${err.toString()}`);
            return res.status(500).json({
                'error': 'Erreur inattendue de la part du serveur',
                'msg': err.toString()
            });
        }
    });
};

// Simple promesse de vérification de l'existence d'un produit
export async function foodExists (foodCode: number): Promise<boolean> {
    const food = await foodModel.findOne({ _id: foodCode });
    // Cette astuce de notation permet de convertir n'importe quelle variable javascript en true ou false selon
    // comment le JS doit l'interpréter. Cela revient à avoir le résultat d'une condition dans un "if".
    // On aurait pu aussi retourner food !== null, mais cela pourrait potentiellement créer des bugs dans le cas
    // où le produit n'est pas trouvé mais que mongoose retourne une autre valeur, comme "undefined" ou "false".
    return !!food;
}

// Vérification du type de fichier. Si le mimetype passé en paramètre ne fait pas parti du tableau
// ACCEPTED_TYPES, on refuse l'envoi du fichier.
function isFileTypeValid (mimeType: string): boolean {
    const ACCEPTED_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
    return ACCEPTED_TYPES.indexOf(mimeType) !== -1;
}

// Vérfication du poids du fichier. S'il est trop lourd, on refuse son envoi.
function isFileSizeValid (fileSize: number): boolean {
    // Taille maximale acceptée (en Mo)
    const MAX_FILE_SIZE = 3;
    // Pour convertir des octets en mégaoctets, on divise 2 fois par 1024 (octet -> Ko -> Mo)
    return (fileSize / 1024 / 1024) <= MAX_FILE_SIZE;
}

function formatFood (foodToInsert: any, code: string) {
    return {
        _id: code,
        code,
        name: foodToInsert.name,
        brand: foodToInsert.brand,
        nutrition: {
            fibers: foodToInsert.fibers,
            proteins: foodToInsert.proteins,
            sugar: foodToInsert.sugar,
            saturatedFats: foodToInsert.saturatedFats,
            calories: foodToInsert.calories,
            salt: foodToInsert.salt
        }
    };
};
