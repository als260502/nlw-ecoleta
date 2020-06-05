import express, { json } from 'express'
import { celebrate, Joi } from 'celebrate'

import PointsController from './app/controllers/PointsController'
import ItemsController from './app/controllers/ItemsController'

import multer from 'multer'
import multerConfig from './config/multer'
import { createPointValidateMiddleware } from './app/middlewares/middlewares'

const routes = express.Router()
const upload = multer(multerConfig)
const pointsController = new PointsController()
const itemsController = new ItemsController()


routes.get('/items', itemsController.index)

routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)

routes.post('/points',
  upload.single('image'),
  createPointValidateMiddleware,
  pointsController.create)


export default routes