import { JwtPayload } from 'jsonwebtoken'
import { createApolloServer } from '..'

export type TTokenPayload = {
  userid: string
}
export interface IJwtCustomPayload extends JwtPayload, TTokenPayload {}
export type TServer = Awaited<ReturnType<typeof createApolloServer>>
