const pg = require('pg')
const { Client } = pg

const client = new Client({
    user: 'rcd_user',
    password: 'car_driver_psd',
    host: 'localhost',
    port: 5432,
    database: 'vpn',
})

async function Main() {
    await client.connect();
    const createDbText = "CREATE TABLE users (path varchar(300), name varchar(100), password varchar(100), type varchar(300));";
    const creatingTable = await client.query(createDbText)
    console.log(`Creating table result: ${creatingTable.command}`)

    //const queryText = "INSERT INTO cars VALUES ('Машина 1', '123123123', FALSE, 0, 0, null, null, null);";
    //const result = await client.query(queryText)

    //console.log(`Filling table result: ${result.command}`)
    return 1;
}

Main();