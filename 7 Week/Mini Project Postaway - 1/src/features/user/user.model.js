import { ApplicationError } from "../../middlewares/errorHandler.middleware.js";

class UserModel {
        constructor(name, email, password) {
                this.id = users.length + 1;
                this.name = name;
                this.email = email;
                this.password = password;
        }



        static signUp(name, email, password) {
                const user = users.find(user => user.email === email);
                if (!user) {
                        const newUser = new UserModel(name, email, password);
                        users.push(newUser);
                        return newUser;
                } else {
                        throw new ApplicationError(`User with email ${email} already exists`, 409); // 409 Conflict
                }
        }

        static signIn(email, password) {
                const user = users.find(user => user.email === email && user.password === password);
                if (!user) {
                        throw new ApplicationError('Invalid email or password', 401); // 401 Unauthorized
                }
                return user;
        }

        static findUser(email) {
                const user = users.find(user => user.email === email);
                if (!user) {
                        throw new ApplicationError(`User with email ${email} not found`, 404); // 404 Not Found
                }
                return user;
        }

        static getAllUsers() {
                return users;
        }

        static getUserById(id) {
                const user = users.find(user => user.id === id);
                if (!user) {
                        throw new ApplicationError(`User with ID ${id} not found`, 404); // 404 Not Found
                }
                return user;
        }

        static updateUser(id, name) {
                const userIndex = users.findIndex(user => user.id === id);
                if (userIndex === -1) {
                        throw new ApplicationError(`User with ID ${id} not found`, 404); // 404 Not Found
                }
                const user = users[userIndex];
                user.name = name || user.name;
                users[userIndex] = user;
                return user;
        }
}

const users = [{ id: 1, name: 'Moin Khan', email: 'mkhan@gmail.com', password: 'mkhan' },
{ id: 2, name: 'Moin Khan', email: 'user@example.com', password: 'password123' }
];

export default UserModel;
