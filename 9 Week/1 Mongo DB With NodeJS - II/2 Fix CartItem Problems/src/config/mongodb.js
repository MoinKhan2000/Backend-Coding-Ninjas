import { MongoClient } from "mongodb"
const url = process.env.DB_URL
let client;
export const connectToMonngoDB = () => {
  MongoClient.connect(url).then(clientInstance => {
    client = clientInstance
    console.log('MongoDB is connected');
  }).catch(err => {
    console.log(`Error connecting to MongoDB ${err}`);
  }
  )
}

export const getDB = () => {
  return client.db()
}
