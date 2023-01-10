import jwt from 'jsonwebtoken'
import { TTokenPayload } from '../types/types'

/**
 * Represents a helper for generating and verifying refresh and access tokens.
 */
export class AuthTokenHelper {
  /**
   * Attempts to verify a refresh token.
   *
   * @param token the refresh token. 
   * @returns Null if the token is not valid.
   */
  verifyRefreshToken(token?: string): TTokenPayload | null {
    if (!token) return null
    try {
      return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as TTokenPayload
    } catch (e) {
      return null
    }
  }

  /**
   * Attempts to verify an access token.
   *
   * @param token the access token. 
   * @returns Null if the token is not valid.
   */
  verifyAccessToken(token?: string): TTokenPayload | null {
    if (!token) return null
    try {
      return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as TTokenPayload
    } catch (e) {
      return null
    }
  }

  /**
   * Generates a jwt access token.
   *
   * @param payload the token payload.
   * @returns the generated token.
   */
  generateAccessToken(payload: TTokenPayload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: '15m'
    })
  }

  /**
   * Generates a jwt refresh token.
   *
   * @param payload the token payload.
   * @returns the generated token.
   */
  generateRefreshToken(payload: TTokenPayload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: '7d'
    })
  }
}
