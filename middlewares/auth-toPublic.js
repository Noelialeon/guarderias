module.exports = redirect => (req, res, next) => {
  const url = req.params.username;
  if (req.isAuthenticated() && req.params.username === req.user.username) {
    next();
  } else {
    res.redirect(redirect + url);
  }
};
