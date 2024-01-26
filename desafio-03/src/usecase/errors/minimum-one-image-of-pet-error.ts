export class MinimumOneImageOfPetError extends Error {
  constructor() {
    super('At least 1 image of the pet is required.')
  }
}
