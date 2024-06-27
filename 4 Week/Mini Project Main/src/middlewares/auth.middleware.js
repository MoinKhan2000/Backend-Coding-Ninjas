export const auth = (req, res, next) => {
  if (req.session && req.session.userEmail) {
    next();
  } else {
    res.redirect('/login');
  }
};
