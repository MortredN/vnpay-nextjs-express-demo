function applyAssociations(db) {
  const { User, Product, CartSession, CartItem } = db

  User.hasOne(CartSession, { foreignKey: 'userId' })
  CartSession.belongsTo(User, { foreignKey: 'userId' })

  CartSession.belongsToMany(Product, { through: CartItem, foreignKey: 'sessionId' })
  Product.belongsToMany(CartSession, { through: CartItem, foreignKey: 'productId' })
}

module.exports = applyAssociations
