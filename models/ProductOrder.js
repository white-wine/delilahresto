'use strict';
module.exports =  (sequelize, DataTypes) => {
  const ProductOrder = sequelize.define('ProductOrder', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: true,
      defaultValue: new Date(),
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {});
  ProductOrder.associate = function(models) {
    ProductOrder.belongsTo(models.Product, {
      foreignKey: 'ProductId',
      targetKey: 'id',
    });
    ProductOrder.belongsTo(models.Order, {
      foreignKey: 'OrderId',
      targetKey: 'id',
    });
  };
  return ProductOrder;
};