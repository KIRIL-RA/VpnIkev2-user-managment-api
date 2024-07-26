// Import the pg library
const { Client } = require('pg');
require('dotenv').config();

// Define the connection configuration
const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: 'vpn',
    port: 5432, // Default PostgreSQL port
});

// Connect to the database
client.connect()
    .then(() => {
        console.log('Connected to the database successfully.');

        // Define the query to create the users table
        const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        name VARCHAR(50),
        password VARCHAR(50),
        type VARCHAR(20)
      );
    `;

        // Execute the query to create the table
        return client.query(createTableQuery);
    })
    .then(() => {
        console.log('Table "users" created successfully.');
    })
    .catch((err) => {
        console.error('Error executing query', err.stack);
    })
    .finally(() => {
        // Close the database connection
        client.end();
    });
