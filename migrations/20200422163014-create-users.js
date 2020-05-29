module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING(10),
      unique: true,
      allowNull: false,
    },
    firstname: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(100),
      unique: true,
      allowNull: false,
      lowercase: true,
    },
    address: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    phone_number: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    is_admin: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
      allowNull: false
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};