const { DataTypes, Model } = require('sequelize');
const shortUrlDb = require('../config/dbConnection.js');

const userSchema = shortUrlDb.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        require:true
    },
    email:{
        type: DataTypes.STRING,
        require:true,
        unique:true
    },
    password:{
        type: DataTypes.STRING,
        require:true
    }
},{
    timestamps: true
});

async function syncDatabase() {
    try {
      await shortUrlDb.sync();
      console.log("Database synchronized successfully.");
    } catch (error) {
      console.error('Failed to synchronize the database:', error);
    }
  }
  
  syncDatabase();
  
  module.exports = userSchema;