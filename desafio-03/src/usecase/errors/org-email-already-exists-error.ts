export class OrgEmailAlreadyExistsError extends Error {
  constructor() {
    super('An ORG already exists with this email.')
  }
}
