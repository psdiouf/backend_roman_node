'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.Messagerie, { foreignKey: 'idMessagerie' });
      Message.belongsTo(models.User, { foreignKey: 'idSender' })
    }
  };
  Message.init({
    idMessagerie: DataTypes.INTEGER,
    idSender: DataTypes.INTEGER,
    idRecipient: DataTypes.INTEGER,
    contenu: DataTypes.TEXT,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};