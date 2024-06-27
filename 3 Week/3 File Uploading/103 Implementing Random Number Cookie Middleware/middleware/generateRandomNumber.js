// Please don't change the pre-written code
// Import the necessary modules here

export const generateRandomNumber = (req, res, next) => {
  const randomNumber = Math.floor(Math.random() * 10) + 1;

  req.session.randomNumber = randomNumber;
  res.cookie("randomNumber", randomNumber, {
    maxAge: 1 * 24 * 60 * 60 * 1000,// 1 day expiration
  });
  res.cookie("attemptsLeft", 2, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
  next();
};
