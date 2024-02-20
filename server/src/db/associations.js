function applyAssociations(db) {
  const { User, Product, CartSession, CartItem, Order, OrderItem } = db

  User.hasOne(CartSession, { foreignKey: 'userId' })
  CartSession.belongsTo(User, { foreignKey: 'userId' })

  CartSession.belongsToMany(Product, { through: CartItem, foreignKey: 'sessionId' })
  Product.belongsToMany(CartSession, { through: CartItem, foreignKey: 'productId' })

  User.hasOne(Order, { foreignKey: 'userId' })
  Order.belongsTo(User, { foreignKey: 'userId' })

  Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'orderId' })
  Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'productId' })
}

module.exports = applyAssociations
