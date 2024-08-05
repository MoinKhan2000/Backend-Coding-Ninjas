import { MongoClient } from "mongodb"
const url = process.env.DB_URL
let client;
export const connectToMonngoDB = () => {
  MongoClient.connect(url).then(clientInstance => {
    client = clientInstance
    console.log('MongoDB is connected');
    createCounter(client.db())
    createIndexes(client.db())
  }).catch(err => {
    console.log(`Error connecting to MongoDB ${err}`);
  }
  )
}

// For the transaction purpose.
export const getClinet = () => {
  return client;
}

export const getDB = () => {
  return client.db()
}

const createCounter = async (db) => {
  const existingCounter = await db.collection('counters').findOne({ _id: 'cartItemId' })
  if (!existingCounter) {
    await db.collection('counters').insertOne({ _id: 'cartItemId', value: 0 })
  }
}

const createIndexes = async (db) => {
  try {
    await db.collection('products').createIndex({ price: 1 })
    console.log('Indexes created');
  } catch (error) {
    console.log(error);
  }
}
