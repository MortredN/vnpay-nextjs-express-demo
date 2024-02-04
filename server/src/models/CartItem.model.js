const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  return sequelize.define('CartItem', {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  })
}
