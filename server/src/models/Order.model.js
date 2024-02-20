const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  return sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending'
    },
    total: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      allowNull: false
    }
  })
}
