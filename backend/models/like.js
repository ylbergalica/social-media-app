'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Like extends Model {}

  Like.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Like',
    tableName: 'Likes',
    timestamps: true,
    primaryKey: false
  });

  return Like;
};
