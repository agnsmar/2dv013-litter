/**
 * Mongoose model Token.
 *
 * @version 1.0.0
 */

import mongoose from 'mongoose'

// Create a schema.
const schema = new mongoose.Schema({
  token: {
    type: String
  }
})

/**
  * Saves a new refresh token.
  *
  * @param {object} token - ...
  * @returns {Promise<Token>} - ...
  */
schema.statics.insert = async function (token) {
  const refreshToken = new Token(token)
  return refreshToken.save()
}

// Create a model using the schema.
export const Token = mongoose.model('Token', schema)
