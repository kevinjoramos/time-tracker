import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
const usersCollectionName = "users";
const timersCollectionName = "timers";
const reportsCollectionName = "reports";
export const collections = {};
export async function connectToDatabase() {
    dotenv.config();
    const client = new mongoDB.MongoClient(process.env.MONGO_DB_CONNECTION_STRING);
    await client.connect();
    const db = client.db("time-tracking");
    collections.users = db.collection(usersCollectionName);
    collections.timers = db.collection(timersCollectionName);
    collections.reports = db.collection(reportsCollectionName);
    console.log(`Successfully connected to database: ${db.databaseName} and collections: 
        \n\t${collections.users.collectionName}
        \n\t${collections.timers.collectionName}
        \n\t${collections.reports.collectionName}
    `);
}
//# sourceMappingURL=connection.js.map