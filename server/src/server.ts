import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { AppDataSource } from './data-source'
import authRoutes from './routes/auth'
import subRoutes from './routes/subs'
import postRoutes from './routes/posts'
import voteRoutes from './routes/votes'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

const app = express()
const origin = 'http://localhost:3000'
app.use(
  cors({
    origin,
    credentials: true,
  }),
)

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
dotenv.config()

app.get('/', (_, res) => res.send('running'))
app.use('/api/auth', authRoutes)
app.use('/api/subs', subRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/votes', voteRoutes)

app.use(express.static('public'))

const port = 4000

app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`)

  AppDataSource.initialize()
    .then(() => {
      console.log('database initialized')
    })
    .catch((error) => console.log(error))
})
