'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Ville, { foreignKey: 'idVille' })
      User.belongsTo(models.Loisir, { foreignKey: 'idLoisir' })
      User.hasMany(models.Contact, { foreignKey: 'idUser' })
      User.hasMany(models.Photo, { foreignKey: 'idUser' })
      User.hasMany(models.Notification, { foreignKey: 'idUser' })
      User.hasMany(models.Messagerie, { foreignKey: 'idMessagerie' })
      User.belongsToMany(models.Alert, { through: 'alert_user' })
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dateDeNaissance: DataTypes.DATE,
    profil: DataTypes.STRING,
    codePostal: DataTypes.STRING,
    texte: DataTypes.TEXT,
    phraseaudio: DataTypes.STRING,
    nombreEnfant: DataTypes.INTEGER,
    nombreLike: DataTypes.INTEGER,
    nombreVue: DataTypes.INTEGER,
    vie: DataTypes.BOOLEAN,
    serie: DataTypes.STRING,
    artiste: DataTypes.STRING,
    idVille: DataTypes.INTEGER,
    idLoisir: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};