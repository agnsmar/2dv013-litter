import { profile, user } from "@prisma/client"
import { RESTTokenPayload, TTokenPayload } from "./types"

declare global {
  namespace Express {
    export interface Request {
      user: user
      profile: profile
      account: RESTTokenPayload
    }
  }
}