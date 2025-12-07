// Order model for SQL (Sequelize)
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Order = sequelize.define('Order', {
         id: {
                  type: DataTypes.INTEGER,
                  autoIncrement: true,
                  primaryKey: true
         },
         userId: {
                  type: DataTypes.INTEGER,
                  allowNull: false
         },
         total: {
                  type: DataTypes.FLOAT,
                  allowNull: false
         },
         createdAt: {
                  type: DataTypes.DATE,
                  allowNull: false,
                  defaultValue: DataTypes.NOW
         }
}, {
         tableName: 'orders',
         timestamps: false
});

export default Order;
