const pg = require('pg')
require('dotenv').config();
const { Client } = pg

const table_names = {
    USERS: "users"
}

const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    port: 5432,
    database: 'vpn',
})

// Create class for work with database
class DataBaseWorker{
    constructor(){
        this.isConnected = false;

        this.client = client;
    }

    // Connect to database
    async Connect(){
        if(this.isConnected) return;

        await this.client.connect();
        this.isConnected = true;
    }

    async SearchUser(user=null){
        let query = '';
        if(!user)
            query = `SELECT * FROM ${table_names.USERS};`;
        else
            query = `SELECT * FROM ${table_names.USERS} WHERE name = '${user}';`;

        // Request data from table
        const result = await this.client.query(query);
        return result.rows;
    }

    /**
     * Add new user to database
     * @param {*} user 
     * @param {*} path 
     * @param {*} password 
     * @param {*} type 
     * @returns 
     */
    async AddUser(user, path, password='_', type='_'){
        let query = '';
        query = `INSERT INTO ${table_names.USERS} ( name, password, type) VALUES ('${user}', '${password}', '${type}');`;

        // Request data from table
        const result = await this.client.query(query);
        return result.rows;
    }

    async DeleteUser(user){
        let query = '';
        query = `DELETE FROM ${table_names.USERS} WHERE name = '${user}'`;

        // Request data from table
        const result = await this.client.query(query);
        return result.rows;
    }
}

const db = new DataBaseWorker();
module.exports = db;