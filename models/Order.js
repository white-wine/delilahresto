'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    order_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order_amount: {
      type: DataTypes.STRING,
      allowNull: false
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    //M:1
    Order.belongsTo(models.User, {
      foreignKey: 'UserId',
      targetKey: 'id',
    });
    //M:M
    Order.belongsToMany(models.Product, {
      through: { model: models.ProductOrder },
      as: 'products',
      foreignKey: 'OrderId',
    });
  };
  return Order;
};