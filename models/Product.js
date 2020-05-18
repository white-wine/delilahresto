'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    product_price: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    product_photo: {
      type: DataTypes.STRING(100),
      allowNull: false,
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
  }, {
    //  hooks: {
    //    afterCreate: function(product, options) {
    //     delete product.createdAt;
    //     delete product.updatedAt;
    //    }
    // }
  });
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsToMany(models.Order, {
      through: { model: models.ProductOrder },
      as: 'orders',
      foreignKey: 'ProductId',
    });
  };
  Product.me
  return Product;
};