module.exports = {
  up(queryInterface) {
    return queryInterface.addConstraint(
      'Orders', ['UserId'], {
        type: 'foreign key',
        name: 'fk_orders_userId',
        references: {
          table: 'Users',
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  },
  down(queryInterface, Sequelize) {
    return queryInterface.removeConstraint('Orders', 'fk_orders_userId');
  },
};