import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

const usersCollectionName: string = "users"
const timersCollectionName: string = "timers"
const reportsCollectionName: string = "reports"

export const collections: {
    users?: mongoDB.Collection,
    timers?: mongoDB.Collection,
    reports?: mongoDB.Collection
} = {}

export async function connectToDatabase () {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGO_DB_CONNECTION_STRING);

    await client.connect();

    const db: mongoDB.Db = client.db("time-tracking");

    collections.users = db.collection(usersCollectionName)
    collections.timers = db.collection(timersCollectionName)
    collections.reports = db.collection(reportsCollectionName)

    console.log(`Successfully connected to database: ${db.databaseName} and collections: 
        \n\t${collections.users.collectionName}
        \n\t${collections.timers.collectionName}
        \n\t${collections.reports.collectionName}
    `);
}
