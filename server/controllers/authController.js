exports.login = (req, res) => {
  res.redirect('/user');
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.currentUser = (req, res) => {
  res.send(req.user);
};
