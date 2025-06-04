import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!

if(!MONGODB_URI){
  throw new Error("Please define mongodb uri in env file")
}

let cached = global.mongoose

if(!cached){
  cached = global.mongoose = {connection: null, promise: null}
}

export async function connectToDatabase() {
    if(cached.connection){
      return cached.connection
    }

    if(!cached.promise){
      const opts = {
        bufferCommands: true,
        maxPoolSize: 10
      }

      cached.promise = mongoose.connect(MONGODB_URI, opts).then(() => mongoose.connection)
    }

  try {
    cached.connection = await cached.promise
  } catch (error) {
    cached.promise = null
    console.warn(error)
    throw new Error('Check database file')
  }

  return cached.connection
}