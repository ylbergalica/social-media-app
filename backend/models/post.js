'use strict';

const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

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
    allowNull: false
  },
  text: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  modelName: 'Post',
  tableName: 'Posts',
  timestamps: true
});

module.exports = Post;
