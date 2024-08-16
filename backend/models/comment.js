'use strict';

const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Comment extends Model {}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
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
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Comment',
  tableName: 'Comments',
  timestamps: true
});

module.exports = Comment;
