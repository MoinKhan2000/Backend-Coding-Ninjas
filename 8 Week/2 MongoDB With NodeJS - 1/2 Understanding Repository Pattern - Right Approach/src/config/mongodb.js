import { MongoClient } from "mongodb"
const url = 'mongodb://localhost:27017/ecomdb'
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
