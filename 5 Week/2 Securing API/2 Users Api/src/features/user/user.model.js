export class UserModel {
    constructor(name, email, password, typeOfUser) {
        this.id = users.length + 1
        this.name = name
        this.email = email
        this.password = password
        this.typeOfUser = typeOfUser
    }

    static signUp(name, email, password, typeOfUser) {
        let isToBeCreated = false
        let user = users.find(user => user.email === email)
        if (!user) {
            let newUser = new UserModel(name, email, password, typeOfUser)
            users.push(newUser)
            return newUser
        }
        return null
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
    }
    ,
    {
        id: 2,
        name: 'Moin Khan',
        email: 'mkhan@gmail.com',
        password: 'mkhan',
        typeOfUser: 'buyer'
    }
]