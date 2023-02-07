import crypto from 'crypto'

/**
 * Represents a test user.
 */
export class TestUser {
  #email
  #username
  #password

  constructor() {
    this.#email = crypto.randomUUID() + '@gmail.com'
    this.#username = crypto.randomUUID()
    this.#password = 'd1e8a5ca8652fbcb01ef428feacbce41'
  }

  get email() {
    return this.#email
  }

  get username() {
    return this.#username
  }

  get password() {
    return this.#password
  }
}