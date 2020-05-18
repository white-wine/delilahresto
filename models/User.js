'use strict';
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      lowercase: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_admin: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    createdAt:{
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false,
    },
    updatedAt:{
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    // hooks: {
    //   beforeCreate: function (user, options, fn) {
    //     const now = new Date()
    //     user.createdAt = now
    //     user.updatedAt = now
    //     fn(null, user);
    //   },
    //   beforeUpdate: function (user, options, fn) {
    //     const now = new Date()
    //     user.updatedAt = now;
    //     fn(null, user);
    //   }
    // }
  });
  User.beforeCreate((user, options) => {
    if (!user.changed('password')) {
      return sequelize.Promise.reject("not modified");
    }
    if (user.password) {
      user.password = bcrypt.hashSync(user.password, 10);
    }
  });
  User.beforeBulkUpdate((user, options) => {
    if (user.attributes.password) {
      user.attributes.password = bcrypt.hashSync(user.attributes.password, 10);
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    // 1:M
    User.hasMany(models.Order, {
      foreignKey: 'UserId',
      as: 'orders'
    });
  };
  return User;
};