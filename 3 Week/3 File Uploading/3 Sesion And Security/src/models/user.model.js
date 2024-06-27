export default class UserModel {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static add(name, email, password) {
        const newUser = new UserModel(user.length + 1, name, email, password);
        user.push(newUser);
        console.log(newUser);
    }
    static login(email, password) {
        var userDetails = user.find((u) => u.email == email && u.password == password);
        console.log(userDetails);
        return userDetails
    }
}

var user = []