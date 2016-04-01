"use strict";

module.exports = function(sequelize, DataTypes) {
  var potd = sequelize.define('potd', {
    date: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    explanation: { type: DataTypes.TEXT },
    url: { type: DataTypes.STRING(1000) },
    hdurl: { type: DataTypes.STRING(1000) },
    copyright: { type: DataTypes.STRING },
    mediaType: { type: DataTypes.ENUM('image', 'video') }
  },
  {
      freezeTableName: true // Model tableName will be the same as the model name
  });

  return potd;
};
