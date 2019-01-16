import * as mongoose from 'mongoose';

// Description de la collection "foods"
const foodSchema = new mongoose.Schema({
    _id: String,
    images: [String],
    additives: [String],
    code: String,
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

const commentSchema = new mongoose.Schema({
    date: Number, // timestamp
    code: String, // code du produit concerné
    name: String,
    message: String
});

export const commentModel = mongoose.model('comment', commentSchema, 'comments');
