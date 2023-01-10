import { JwtPayload } from 'jsonwebtoken'

export type TTokenPayload = {
  userid: string
}

export type RESTTokenPayload = {
  id: number
}

export interface IJwtCustomPayload extends JwtPayload {
  userid: string
}
