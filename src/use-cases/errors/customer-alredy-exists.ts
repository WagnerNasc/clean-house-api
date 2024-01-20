export class CustomerAlreadyExists extends Error {
  constructor() {
    super('Customer alredy exists.')
  }
}
