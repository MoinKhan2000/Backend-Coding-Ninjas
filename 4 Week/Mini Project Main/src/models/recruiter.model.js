class RecruiterModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static add(name, email, password) {
    // Check if the user with the same email is already registered
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return false;
    }

    // Add the new user
    const newUser = new RecruiterModel(users.length + 1, name, email, password);
    users.push(newUser);
    return true
  }

  static isValidUser(email, password) {
    const result = users.find((u) => u.email === email && u.password === password);
    return result;
  }
}

// Initial users array for testing
var users = [{ id: 1, email: "moink3181@gmail.com", password: "mkhan" }];

export default RecruiterModel;
