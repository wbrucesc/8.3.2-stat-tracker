const models = require('../models');

module.exports = {
  create: function(req, res){
    models.User.create({
      username: req.body.username,
      password: req.body.password
    }).then(function(user){
      res.json(user);
    }); 

  },

};
