const bcrypt = require('bcryptjs');
/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    username: 'sescobar',
    firstname: 'Sol',
    lastname: 'Escobar',
    email: 'sescobar@gmail.com',
    address: 'direccion 202',
    phone_number: '2223333',
    password: bcrypt.hashSync('123456', 10),
    is_admin: true
  }], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
}