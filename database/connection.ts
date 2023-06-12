import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

const usersCollectionName: string = "users"
const timersCollectionName: string = "timers"

export const collections: {
    users?: mongoDB.Collection,
    timers?: mongoDB.Collection,
} = {}

export async function connectToDatabase () {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGO_DB_CONNECTION_STRING);

    await client.connect();

    const db: mongoDB.Db = client.db("time-tracking");

    collections.users = db.collection(usersCollectionName)
    collections.timers = db.collection(timersCollectionName)

    console.log(`Successfully connected to database: ${db.databaseName} and collections: 
        -\t${collections.users.collectionName}
        -\t${collections.timers.collectionName}
    `);
}
