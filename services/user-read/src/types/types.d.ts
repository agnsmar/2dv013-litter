import { profile, user } from "@prisma/client"

declare global {
  namespace Express {
    export interface Request {
      user: user
      profile: profile
    }
  }
}
