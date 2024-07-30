import { getDB } from "../../config/mongodb.js"
import { ApplicationError } from "../../errorHandler/applicatioonError.js"

export class UserModel {
    constructor(name, email, password, typeOfUser, id) {
        this.name = name
        this.email = email
        this.password = password
        this.typeOfUser = typeOfUser
        this._id = id
    }

    static async signUp(name, email, password, typeOfUser) {
        try {
            // 1. Get the DataBase 
            const db = getDB()

            // 2. Get the Collection.
            const collection = db.collection('users')

            // 3. Check if the user already exists.
            let user = await collection.findOne({ email })
            if (!user) {
                let newUser = new UserModel(name, email, password, typeOfUser)
                // 4. Insert the document 
                await collection.insertOne(newUser)
                return newUser
            }
            else {
                return null
            }
        } catch (error) {
            console.log(error);
            return null
        }
    }

    static findUser(email, typeOfUser) {
        let user = users.find(user => user.email === email && user.typeOfUser === typeOfUser)
        if (user) {
            return user
        }
        return null
    }
    static signIn(email, password) {
        let user = users.find(user => user.email === email && user.password === password)
        if (user) {
            return user
        }
        return null
    }

    static getAllUsers() {
        return users
    }

    static getUserById(id) {
        let userDetails = users.find(user => user.id === id)
        if (userDetails) {
            return userDetails
        }
        else {
            return null
        }
    }
}

let users = [
    {
        id: 1,
        name: 'Moin Khan',
        email: 'moin@gmail.com',
        password: 'mkhan',
        typeOfUser: 'seller'
    },
    {
        id: 2,
        name: 'Moin Khan',
        email: 'mkhan@gmail.com',
        password: 'mkhan',
        typeOfUser: 'buyer'
    }
]