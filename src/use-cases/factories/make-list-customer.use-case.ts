import { ListCustomerUseCase } from '../customer/list-customer.use-case'
import { RepositoryFactory } from '../../repositories/customer-factory.repository'

export function makeListCustomerUseCase() {
  const customerRepository = RepositoryFactory.makeCustomerRepository()
  const listCustomerUseCase = new ListCustomerUseCase(customerRepository)

  return listCustomerUseCase
}
