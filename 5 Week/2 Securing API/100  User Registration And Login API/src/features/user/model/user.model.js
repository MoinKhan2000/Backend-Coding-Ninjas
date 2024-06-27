// Please don't change the pre-written code
// Import the necessary modules here

const users = [];
let id = 0;
class UserSchema {
  constructor(name, email, password) {
    this.id = ++id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export const addUser = (data) => {
  const { name, email, password } = data;
  let isUserPresent = users.find(user => user.email === email)
  if (!isUserPresent) {
    const newUser = new UserSchema(name, email, password);
    users.push(newUser);
    return newUser
  }
  return null
};
addUser({ name: "vivek", email: "krvivi28@gmail.com", password: "vivek" });

export const confirmLogin = (data) => {
  const { email, password } = data;
  const index = users.findIndex(user => user.email === email && user.password === password);
  if (index !== -1) {
    return true;
  }
  return false;
};

export const getAllUsers = () => {
  return users;
};
