const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '7758',
    database: 'representatives_db'
});

module.exports = sequelize;



// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize({
//     dialect: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'postgres',
//     password: '7758',
//     database: 'respresentatives_db'
// });

// module.exports = {
//     development: {
//         dialect: 'postgres',
//         host: 'localhost',
//         port: 5432,
//         username: 'postgres',
//         password: '7758',
//         database: 'respresentatives_db',
//         logging: false // Set to true to log SQL queries
//     },
//     production: {
//         // Production database configuration
//         dialect: 'postgres',
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT || 5432,
//         username: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME,
//         logging: false // Set to true to log SQL queries
//     },
//     sequelize: sequelize // Export the Sequelize instance for usage in other parts of your application
// };
