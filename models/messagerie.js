'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messagerie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Messagerie.hasMany(models.Messagerie, { foreignKey: 'idMessagerie' });
      Messagerie.belongsTo(models.User, { foreignKey: 'idUser' })
    }
  };
  Messagerie.init({
    idUser: DataTypes.INTEGER,
    idRecipient: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Messagerie',
  });
  return Messagerie;
};