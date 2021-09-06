'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Loisir extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Loisir.hasMany(models.User, { foreignKey: 'idLoisir' })
    }
  };
  Loisir.init({
    libelle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Loisir',
  });
  return Loisir;
};