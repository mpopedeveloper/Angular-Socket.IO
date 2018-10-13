import { Product } from '../models/Product';
// import { productArray } from '../data/products'

export class ProductController {

    // public static initializeProducts() {
    //     productArray.forEach(product => {
    //         let productModel = new Product({
    //             title: product.title,
    //             quantity: product.quantity
    //         });
    //         productModel.save()
    //             .then(result => console.log(result))
    //             .catch(err => console.log(err));
    //     });
    // }

    public static returnAllProducts() {
        return Product.find({})
            .then(results => {
                //console.log(results);
                return results;
            })
            .catch(err => { console.log(err); });
    }

    public static async asyncProductRetrieval() {
        let products = await ProductController.returnAllProducts;
        console.log('products' + products);
        return products;
    }

    public static async incrementProduct() {
        return Product.findOneAndUpdate({ title: 'Product 1' }, { $inc: { quantity: 1 } })
            .then(result => console.log(result))
            .catch(err => console.log(err));
    }

    public static decrementProduct() {
        return Product.findOneAndUpdate({ title: 'Product 1' }, { $inc: { quantity: -1 } })
            .then(result => console.log(result))
            .catch(err => console.log(err));
    }
}
