const Models = require('../models/dbModels');

const withAuth = function (req, res, next) {
  const { _id, token } = req.body;

  console.log(req.body);

  if (_id !== null && token !== null && (typeof _id !== 'undefined') && (typeof token !== 'undefined')) {
    Models.User.findById(_id, function (err, user) {
      if (err) {
        res.status(401).send('Unauthorized');
      } else if (token === user.token) {
        next();
      } else {
        res.status(401).send('Unauthorized');
      }
    });
  }
  else {
    res.status(401).send('Unauthorized');
  };
}

module.exports = withAuth;