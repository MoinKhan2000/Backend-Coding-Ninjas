// Please don't change the pre-written code
// Import the necessary modules here

export const users = [
  { id: 1, name: "vivek", email: "krvivi28@gmail.com", password: "vivek28@" },
];

export const registerUser = (user) => {
  const { name, email, password } = user
  const newUser = { id: users.length + 1, name: name, email: email, password: password }
  users.push(newUser)
  return newUser
};


export const authenticateUser = (reqUser) => {
  const { email, password } = reqUser
  const user = users.find(user => user.email === email && user.password === password)
  if (user) { return true } else { return false }
};



