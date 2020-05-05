'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Products', [{
    product_name: 'Key Lime Pie',
    product_price: 250,
    product_photo: 'https://www.themealdb.com/images/media/meals/qpqtuu1511386216.jpg'
  }], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Products', null, {}),
};