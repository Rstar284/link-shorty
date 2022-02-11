import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { links?: mongoDB.Collection } = {};

export const connect = async () => {
  dotenv.config();
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.MONGO_URL,
  );
  await client.connect();
  const db: mongoDB.Db = client.db(process.env.DB_NAME);
  const collection: mongoDB.Collection = db.collection(process.env.DB_COLLECTION);
  collections.links = collection;
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${collection.collectionName}`);
};
