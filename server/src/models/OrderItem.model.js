const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  return sequelize.define('OrderItem', {
    price: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    total: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      allowNull: false
    }
  })
}
