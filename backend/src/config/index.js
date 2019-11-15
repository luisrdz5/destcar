require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    googleAPIKey: process.env.GOOGLEMAPSKEY,
    country:  process.env.country
};
module.exports = { config };