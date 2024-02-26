const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  return sequelize.define('CartSession', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    expiredAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  })
}
