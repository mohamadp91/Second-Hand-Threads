import Mongoose from 'mongoose'

export const connectDb = async (
  uri: string,
  options?: Mongoose.ConnectOptions,
) => Mongoose.connect(uri, options)
