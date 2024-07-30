import { UserModel } from "./user.model.js";
import jwt from 'jsonwebtoken'
import UserRepository from "./user.repository.js";

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository()
    }

    async signIn(req, res) {
        try {
            let { email, password } = req.body;
            let user = await this.userRepository.signIn(email, password)
            if (user) {
                // 1. Create tocken.
                const token = jwt.sign({ userId: user.id, email: user.email, name: user.name }, 'SECRET_KEY', {
                    expiresIn: '1h'
                })

                // 2. Send Tocken.
                res.status(200).send(token)
            } else {
                res.status(400).send('Incorrect username or password')
            }
        } catch (error) {
            res.status(200).send('Something went wrong.')
        }
    }

    async signUp(req, res) {
        try {
            let { name, email, password, typeOfUser } = req.body;
            let user = new UserModel(name, email, password, typeOfUser)
            let result = await this.userRepository.signUp(user)
            if (result) {
                res.status(201).send(user)
            } else {
                res.status(404).send('User could not be created')
            }
        } catch (error) {
            res.status(error.statusCode).send(error.message)
        }
    }

    getAllUsers(req, res) {
        let allUsers = UserModel.getAllUsers()
        res.status(200).send(allUsers)
    }


    getUserbyId(req, res) {
        let id = Number.parseInt(req.params.id)
        let user = UserModel.getUserById(id)
        console.log(user, id);
        res.status(200).send(user)
    }
}