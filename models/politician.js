// models/politician.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Vote = require('./vote'); // Assuming Vote model is defined in a separate file

const Politician = sequelize.define('politician', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    party: {
        type: DataTypes.STRING
    },
    district: {
        type: DataTypes.STRING
    },
    // Add more columns as needed
}, {
    tableName: 'politicians', // Update table name if necessary
    timestamps: false
});

// Define associations
Politician.hasMany(Vote, { foreignKey: 'politicianId' }); // A politician can have many votes
Vote.belongsTo(Politician, { foreignKey: 'politicianId' }); // Each vote belongs to one politician

// Define association with Bill model
const Bill = sequelize.define('bill', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    // Add more columns as needed
}, {
    tableName: 'bills',
    timestamps: false
});

Politician.belongsToMany(Bill, { through: Vote }); // A politician can vote for many bills
Bill.belongsToMany(Politician, { through: Vote }); // A bill can be voted for by many politicians

module.exports = Politician;
