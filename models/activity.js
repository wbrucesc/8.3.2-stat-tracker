'use strict';
module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define('Activity', {
    name: {type: DataTypes.STRING, allowNull: false},
    timesPerformed: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      }
    }
  });

  Activity.associate = function(models){
    Activity.belongsTo(models.User, {foreignKey: 'userId'});
  };
  return Activity;
};
