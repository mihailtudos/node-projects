const { MongoClient, ObjectId } = require('mongodb');

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

async function getItems(query) {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('tasks');

    const completedTasks = await collection.find(query).toArray();

    console.log(completedTasks);
    client.close();
}

async function updateRecord(query, update) {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('tasks');
    const res = await collection.updateMany(query, {$set: update});

    console.log(res);
    client.close();
}


async function deleteItems(query) {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('tasks');
    const res = await collection.deleteMany(query);

    console.log(res);
    client.close();
}

deleteItems({
    completed: false
});