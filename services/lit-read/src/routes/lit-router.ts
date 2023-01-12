import createError from 'http-errors'
import express from 'express'

import { LitController } from '../controllers/lit-controller'
 
export const router = express.Router()
const controller = new LitController()

// Find all lits belonging to a given collection of users
router.get('/', (req, res, next) => controller.findAll(req, res, next))

// Grabs ID and makes it usable within the findAll controller method
router.param('id', (req, res, next, id) => controller.prepQuery(req, res, next, id))

// Find all lits belonging to the given ID
router.get('/:id', (req, res, next) => controller.findAll(req, res, next))
