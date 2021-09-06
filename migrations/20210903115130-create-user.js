'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dateDeNaissance: {
        allowNull: true,
        type: Sequelize.DATE
      },
      codePostal: {
        allowNull: true,
        type: Sequelize.STRING
      },
      profil: {
        allowNull: true,
        type: Sequelize.STRING
      },
      texte: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      phraseaudio: {
        allowNull: true,
        type: Sequelize.STRING
      },
      nombreEnfant: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      nombreLike: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      nombreVue: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      vie: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      serie: {
        allowNull: true,
        type: Sequelize.STRING
      },
      artiste: {
        allowNull: true,
        type: Sequelize.STRING
      },
      idVille: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Villes',
          key: 'id'
        }
      },
      idLoisir: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Loisirs',
          key: 'id'
        }

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};