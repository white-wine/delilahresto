'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Products', [{
    product_name: 'Key Lime Pie',
    product_price: 250,
    product_photo: 'https://www.themealdb.com/images/media/meals/qpqtuu1511386216.jpg'
  }, {
    product_name: 'Dona',
    product_price: 100,
    product_photo: 'https://www.themealdb.com/images/media/meals/4i5cnx1587672171.jpg'
  }, {
    product_name: 'Banana Pancakes',
    product_price: 150,
    product_photo: 'https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg'
  }], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Products', null, {}),
};