import {model, Schema} from 'mongoose';

const ProductSchema: Schema = new Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true
    }
});
export const Product = model('Product', ProductSchema);