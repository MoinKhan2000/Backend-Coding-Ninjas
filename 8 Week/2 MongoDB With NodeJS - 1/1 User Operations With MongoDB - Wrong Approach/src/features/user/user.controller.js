import { UserModel } from "./user.model.js";
import jwt from 'jsonwebtoken'

export default class UserController {
    async signIn(req, res) {
        let { email, password } = req.body;
        let user = await UserModel.signIn(email, password)
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
    }

    async signUp(req, res) {
        let { name, email, password, typeOfUser } = req.body;
        let isUserPresent = UserModel.findUser(email, typeOfUser)
        if (isUserPresent) {
            res.status(400).send('User already exists')
        }
        else {
            let user = await UserModel.signUp(name, email, password, typeOfUser)
            if (user) {
                res.status(201).send(user)
            } else {
                res.status(404).send('User could not be created')
            }
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