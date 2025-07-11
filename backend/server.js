import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'

import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import postRoutes from './routes/post.route.js'
import notificationRoutes from './routes/notification.route.js'
import connectMongoDB from './db/connectMongoDB.js'

dotenv.config()
const app = express()

connectMongoDB()

const corsOptions = {
  origin:'https://x-clone-ruddy.vercel.app',// Allow the frontend domain
  methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allowed methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  };


app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
  console.log("CORS Headers:");
  console.log(req.headers);
  next();
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/notifications', notificationRoutes)

app.all('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

export default app
