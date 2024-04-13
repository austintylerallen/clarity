// models/Politician.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Politician = sequelize.define('Politician', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    party: {
        type: DataTypes.STRING
    },
    district: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING
    },
    zipCode: {
        type: DataTypes.STRING
    },
    latitude: {
        type: DataTypes.FLOAT
    },
    longitude: {
        type: DataTypes.FLOAT
    }
});

// Add class methods to search politicians by ZIP code or coordinates
Politician.findByZipCode = async function(zipCode) {
    return await Politician.findAll({ where: { zipCode } });
};

Politician.findByCoordinates = async function(latitude, longitude) {
    // Implement logic to search politicians by coordinates (e.g., within a certain radius)
    return await Politician.findAll({ where: { latitude, longitude } });
};

module.exports = Politician;
