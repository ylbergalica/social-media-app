'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Post extends Model {}

  Post.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    text: {
      type: DataTypes.TEXT
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Post',
    tableName: 'Posts',
    timestamps: true
  });

  return Post;
};
