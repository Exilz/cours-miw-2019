import * as mongoose from 'mongoose';

// Description de la collection "foods"
const foodSchema = new mongoose.Schema({
    code: Number,
    name: String,
    brand: String,
    // Pour 100g de produit
    nutrition: {
        fibers: Number,
        proteins: Number,
        sugar: Number,
        saturatedFats: Number,
        calories: Number,
        salt: Number
    }
});

// Création du model associé
export const foodModel = mongoose.model('food', foodSchema, 'foods');
