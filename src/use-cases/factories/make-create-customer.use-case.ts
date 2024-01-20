import { CreateCustomerUseCase } from '../customer/create-customer.use-case'
import { RepositoryFactory } from '../../repositories/customer-factory.repository'

export function makeCreateCustomerUseCase() {
  const customerRepository = RepositoryFactory.makeCustomerRepository()
  const createCustomerUseCase = new CreateCustomerUseCase(customerRepository)

  return createCustomerUseCase
}
