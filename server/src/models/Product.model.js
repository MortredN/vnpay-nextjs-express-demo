const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  return sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(1000)
    }
  })
}
