import createError from 'http-errors'
import express from 'express'

import { LitController } from '../controllers/lit-controller'
 
export const router = express.Router()
const controller = new LitController()

// Find all lits belonging to a given collection of users
router.get('/', (req, res, next) => controller.findAll(req, res, next))
