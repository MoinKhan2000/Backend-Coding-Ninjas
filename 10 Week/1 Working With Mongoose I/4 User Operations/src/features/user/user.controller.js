import bcrypt from "bcrypt"
import { UserModel } from "./user.model.js";
import jwt from 'jsonwebtoken'
// import UserRepository from "./user.repository_old.js";
import UserRepository from "./user.repository.js";

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository()
    }

    async signIn(req, res) {
        try {
            let { email, password } = req.body;

            // Find the user by email. 
            let user = await this.userRepository.findByEmail(email);

            // If the user is not found then returning the error dUser not found.
            if (!user) {
                res.status(400).send('User not found')
                return null; // Return early if user not found to avoid unnecessary database calls.
            }

            // Else check if the password is correct.
            else {

                const result = await bcrypt.compare(password, user.password)
                // 1. Create tocken.
                if (result) {
                    const token = jwt.sign({ userId: user.id, email: user.email, name: user.name, id: user._id }, 'SECRET_KEY', {
                        expiresIn: '1h'
                    })
                    // 2. Send Tocken.
                    res.status(200).send(token)

                } else {
                    // Return early if password is incorrect to avoid unnecessary database calls.
                    res.status(400).send('Incorrect password')
                    return null;
                }
            }

        } catch (error) {
            res.status(200).send('Something went wrong.')
        }
    }

    async signUp(req, res) {
        try {
            let { name, email, password, typeOfUser } = req.body;
            let hashedPassword = await bcrypt.hash(password, 12)
            let user = new UserModel(name, email, hashedPassword, typeOfUser)
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