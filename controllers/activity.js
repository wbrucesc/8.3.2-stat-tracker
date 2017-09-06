const models = require('../models');

module.exports = {
  list: function(req, res){
    models.Activity.findAll().then(function(activities){
      res.json(activities);
    });
  },
  create: function(req, res){
    models.Activity.create({
      userId: req.user.id,
      name: req.body.name,
      timesPerformed: req.body.timesPerformed,
      date: req.body.date
    }).then(function(activity){
      res.json(activity);
    });
  },
  detail: function(req, res){
    const id = req.params.id;
    models.Activity.findById(id).then(function(activity){
      res.json(activity);
    });
  },
  update: function(req, res){
    const id = req.params.id;
    models.Activity.findById(id).then(function(activity){
      activity.name = req.body.name;
      activity.save();
      res.json(activity);
    });
  },
  delete: function(req, res){
      const id = req.params.id;

      models.Activity.destroy({where: {id: id}}).then(function(activity){
        let message = "activity has been deleted";
        res.json({message: message});
      });
  },
  addStats: function(req, res){
    const id = req.params.id;

    models.Activity.findOne({where: {date: req.body.date}}).then(function(activity){
      activity.name = req.body.name;
      activity.timesPerformed = req.body.timesPerformed;
      activity.date = req.body.date;
      activity.save();
      res.json(activity);
    });
  },
  deleteStats: function(req, res){
    const id = req.params.id;

    models.Activity.destroy({where: {id: req.params.id, date: req.body.date}}).then(function(activity){
      let message = "activity has been deleted from this date";
      res.json({message: message});
    });
  }
};
