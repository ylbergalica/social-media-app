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

  Post.associate = models => {
    Post.belongsTo(models.User, { foreignKey: 'userId' });
    Post.hasMany(models.Comment, { foreignKey: 'postId' });
    Post.belongsToMany(models.User, { through: models.Like, foreignKey: 'postId' });
  };

  return Post;
};
