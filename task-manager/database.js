const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'task-manager';

async function insetItem() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('users');

    try {
        const insertResult = await collection.insertOne({
            name: "Mihail",
            role: 'admin'
        });
        console.log(insertResult);
        client.close();
    } catch (err) {
        console.log(err.message);
    }
}


async function insertMany() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('tasks');

    try {
        const insertResult = await collection.insertMany([
            {
                name: "Work",
                completed: true
            },
            {
                name: "Do sport",
                completed: false
            },
            {
                name: "Study",
                completed: true
            }
        ]);
        console.log(insertResult);
        client.close();
    } catch (err) {
        console.log(err.message);
    }
}

insertMany();