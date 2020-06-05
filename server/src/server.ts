import express from 'express'
import cors from 'cors'
import { errors } from 'celebrate'

import routes from './routes'
import path from 'path'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use('/uploads', express.static(path.resolve(
  __dirname, '..', 'uploads'
)))

app.use(errors())

app.listen(3333, () => {
  console.log("SERVIDOR INICIADO NA PORTA 3333")
})