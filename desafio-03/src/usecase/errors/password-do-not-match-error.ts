export class PasswordsDoNotMatchError extends Error {
  constructor() {
    super(`Passwords don't match.`)
  }
}
