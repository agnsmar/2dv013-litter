import { Profile, User } from "@prisma/client"
import { IJwtRestPayload } from "./types"

declare global {
  namespace Express {
    interface Request {
      user: User
      profile: Profile
      account: IJwtRestPayload
    }
  }
}