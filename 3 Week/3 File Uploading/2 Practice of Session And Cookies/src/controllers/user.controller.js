import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js"
import ProductsController from "./product.controller.js";

export default class UserController {
    getRegister(req, res) {
        res.render('register')
    }

    getLogin(req, res) {
        res.render('login', { errorMessage: null });
    }

    postRegister(req, res) {
        console.log(req.body);
        const { name, email, password } = req.body;
        UserModel.add(name, email, password);
        res.render('login', { errorMessage: null });
    }

    postLogin(req, res) {
        console.log(req.body);
        const { email, password } = req.body;
        const user = UserModel.login(email, password);
        if (user) { res.render('index.ejs', { products: ProductModel.getAll() }) }
        else {
            res.render('login', { errorMessage: 'Email or password is incorrect' })
        }
    }
}