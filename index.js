const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const ActivityController = require('./controllers/activity');
const UserController = require('./controllers/user');
const models = require('./models');

const app = express();
app.use(bodyParser.json());

passport.use(new BasicStrategy(function(username, password, done){
  models.User.findOne({
    where: {
      username: username
    }
  }).then(function(user){
    if (!user){
      return done(null, false);
    } else if (user.password !== password) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  });
}));

//shows list of activities
app.get('/api/activities', passport.authenticate('basic', {session: false}), ActivityController.list);

//creates new user
app.post('/api/users', UserController.create);

//create new activity to track
app.post('/api/activities', passport.authenticate('basic', {session: false}), ActivityController.create);

//show information about one activity
app.get('/api/activities/:id', passport.authenticate('basic', {session: false}), ActivityController.detail);

//update an activity. Allows you to change name
app.put('/api/activities/:id', passport.authenticate('basic', {session: false}), ActivityController.update);

//delete an activity
app.delete('/api/activities/:id', passport.authenticate('basic', {session: false}), ActivityController.delete);




app.listen(3000);
