import createError from 'http-errors'
import express from 'express'

import { LitController } from '../controllers/lit-controller'
 
export const router = express.Router()
const controller = new LitController()

// Find all lits belonging to the given ID
router.get('/:id', (req, res, next) => controller.findAll(req, res, next))
