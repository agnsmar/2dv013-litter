import express from 'express'
import { AuthTokenHelper } from './util/authTokenHelper'

export interface IContext {
  token?: string
  req: express.Request
  res: express.Response
  ath: AuthTokenHelper
}
