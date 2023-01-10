import { JwtPayload } from 'jsonwebtoken'

export interface IJwtRestPayload extends JwtPayload {
  id: number
}

export interface IJwtCustomPayload extends JwtPayload {
  userid: string
}
