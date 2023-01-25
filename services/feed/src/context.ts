import express from 'express'
import amqlib from 'amqplib'
import type { IJwtCustomPayload } from './types/types'

export interface IContext {
  req: express.Request
  res: express.Response
  conn: amqlib.Connection
  token?: IJwtCustomPayload | null
}
