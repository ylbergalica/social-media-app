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
      },
      primaryKey: true
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts',
        key: 'id'
      },
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'Like',
    tableName: 'Likes',
    timestamps: true,
    noPrimaryKey: true
  });

  return Like;
};
