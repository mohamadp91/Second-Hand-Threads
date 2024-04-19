import dotenv from 'dotenv'

import app from './app/app'
import { connectDb } from './config/dbConfig'

dotenv.config({
  path: `./src/config/config.env`,
})

connectDb(process.env.DB || '', undefined).then(() => {
  console.log('Database connected succesfully!!!')
})

const baseUrl = process.env.BASE_URL || '127.0.0.1'
const port = Number.parseInt(
  process.env.PORT !== undefined ? process.env.PORT : '3000',
)

app.listen(port, baseUrl, () => {
  console.log('Server is running...')
})
