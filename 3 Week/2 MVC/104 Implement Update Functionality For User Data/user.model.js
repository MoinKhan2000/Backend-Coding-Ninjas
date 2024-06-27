// Please don't change the pre-written code
// Import the necessary modules here

export const users = [
  {
    id: 1,
    name: "coding ninjas",
    email: "ninja@gmail.com",
    image: "https://entrackr.com/storage/2022/10/Coding-Ninjas.jpg",
  },
];

export const updateUsers = (user) => {
  // console.log("user -> ", user.id);
  var id = user.id;
  var index = users.find((user) => user.id == id)
  // console.log('index -> ', index);
  if (index) {
    users[index] = user
    return true;
  } else {
    return false
  }
};
