// User model for SQL (Sequelize)
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const User = sequelize.define('User', {
         id: {
                  type: DataTypes.INTEGER,
                  autoIncrement: true,
                  primaryKey: true
         },
         name: {
                  type: DataTypes.STRING,
                  allowNull: false
         },
         email: {
                  type: DataTypes.STRING,
                  allowNull: false,
                  unique: true
         },
         passwordHash: {
                  type: DataTypes.STRING,
                  allowNull: false
         },
         role: {
                  type: DataTypes.STRING,
                  allowNull: false,
                  defaultValue: 'customer'
         }
}, {
         tableName: 'users',
         timestamps: false
});

export default User;
