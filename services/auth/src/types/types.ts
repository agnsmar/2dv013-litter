import { JwtPayload } from 'jsonwebtoken'

export type TTokenPayload = {
  userid: string
}

export interface IJwtCustomPayload extends JwtPayload {
  userid: string
}
