'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Activities', 'date', {
      type: Sequelize.DATE,
      allowNull: true
    });



  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Activities', 'date', {
      type: Sequelize.DATE,
      allowNull: false
    });
  }
};
