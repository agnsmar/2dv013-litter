import express from 'express'
import { IJwtCustomPayload } from './types/types'
import { AuthTokenHelper } from './util/authTokenHelper'

export interface IContext {
  token?: IJwtCustomPayload | null
  req: express.Request
  res: express.Response
  ath: AuthTokenHelper
}
