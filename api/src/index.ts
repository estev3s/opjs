import 'dotenv/config'
import path from 'node:path'
import http from 'node:http'
import express from 'express'
import mongoose from 'mongoose'
import { Server } from 'socket.io'

import { router } from './router'

const app = express()
const server = http.createServer(app)
export const io = new Server(server)

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => {
    const port = 3001

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', '*')
      res.setHeader('Access-Control-Allow-Headers', '*')

      next()
    })
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
    app.use(express.json())
    app.use(router)

    server.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`)
    })
  })
  .catch(() => console.log('Erro ao conectar no mongodb'))
