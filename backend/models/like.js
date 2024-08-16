'use strict';

const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

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

Like.removeAttribute('id'); // Remove default primary key since composite key is used

module.exports = Like;
