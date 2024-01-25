export class PasswordsDoNotMatch extends Error {
  constructor() {
    super(`Passwords don't match.`)
  }
}
