import path from 'path';
import ProductModel from '../models/product.model.js';

export default class ProductController {
    getProducts(req, res) {
        let products = ProductModel.get();
        console.log(products);
        res.render('index', { products });
    }

    getAddForm(req, res) {
        return res.render('new-product', { errors: null })
    }

    addnewProduct(req, res) {
        // access data from form.
        let errors = [];
        const { name, price, desc, imageUrl } = req.body
        if (!name || name.trim() == "") {
            errors.push('Name is required');
        }
        if (!desc || desc.trim() == "") {
            errors.push('Description is required');
        }
        if (!price || parseFloat(price) < 1) {
            errors.push('Please provide the correct price it must be not less than 1 and can\'t be none');
        }
        try {
            const validUrl = new URL(imageUrl)
        } catch (error) {
            errors.push('Please provide the correct URL of the image.')
        }
        if (errors.length > 0) {
            return res.render('new-product', { errors: errors });
        }
        ProductModel.add(req.body);
        let products = ProductModel.get();
        return res.render('new-product', { products, errors: null });
    }
}

