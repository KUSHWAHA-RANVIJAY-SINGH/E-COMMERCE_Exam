// OrderItem model for SQL (Sequelize)
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const OrderItem = sequelize.define('OrderItem', {
         id: {
                  type: DataTypes.INTEGER,
                  autoIncrement: true,
                  primaryKey: true
         },
         orderId: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  references: {
                           model: 'orders',
                           key: 'id'
                  }
         },
         productId: {
                  type: DataTypes.STRING,
                  allowNull: false
         },
         quantity: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  defaultValue: 1
         },
         priceAtPurchase: {
                  type: DataTypes.FLOAT,
                  allowNull: false
         }
}, {
         tableName: 'order_items',
         timestamps: false
});

export default OrderItem;
