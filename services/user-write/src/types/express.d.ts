import { profile, user } from "@prisma/client"
import { IJwtRestPayload } from "./types"

declare global {
  namespace Express {
    interface Request {
      user: user
      profile: profile
      account: IJwtRestPayload
    }
  }
}