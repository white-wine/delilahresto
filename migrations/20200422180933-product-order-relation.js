module.exports = {
  up(queryInterface) {
    return queryInterface.addConstraint(
      'ProductOrders', ['ProductId'], {
        type: 'foreign key',
        name: 'fk_productOrders_productId',
        references: {
          table: 'Products',
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    ),
    queryInterface.addConstraint(
      'ProductOrders', ['OrderId'], {
        type: 'foreign key',
        name: 'fk_productOrders_orderId',
        references: {
          table: 'Orders',
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  },
  down(queryInterface, Sequelize) {
    return queryInterface.removeConstraint('ProductOrders', 'fk_productOrders_productId'),
    queryInterface.removeConstraint('ProductOrders', 'fk_productOrders_orderId');
  },
};