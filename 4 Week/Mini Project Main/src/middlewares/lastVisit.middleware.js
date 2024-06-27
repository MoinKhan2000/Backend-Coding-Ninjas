export const setLastVisit = (req, res, next) => {
  // If cookie is set, then add a local variable with last visit time data
  if (req.cookies.lastVisit) {
    const date = new Date(req.cookies.lastVisit);
    const formattedDateTime = date.toLocaleString();

    res.locals.lastVisit = formattedDateTime;
  }

  // Set the last visit cookie to the current time
  res.cookie('lastVisit', new Date().toLocaleString(), {
    maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
  });

  next();
};
