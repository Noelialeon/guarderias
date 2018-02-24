module.exports = redirect => (req, res, next) => {
  const url = req.params.username;
  if (req.isAuthenticated() && req.params.username === req.user.username) {
    res.redirect(redirect + url);
  } else {
    next();
  }
};
