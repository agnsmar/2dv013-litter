import { JwtPayload } from 'jsonwebtoken'
import { createApolloServer } from '..'

export type TServer = Awaited<ReturnType<typeof createApolloServer>>
export type TQuery<T> = {
  query: string
  variables: T
}


export type TTokenPayload = {
  userid: string
}

export interface IJwtCustomPayload extends JwtPayload, TTokenPayload {}
