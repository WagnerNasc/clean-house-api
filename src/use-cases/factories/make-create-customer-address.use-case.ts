import { RepositoryFactory } from '../../repositories/customer-factory.repository'
import { CreateCustomerAddressUseCase } from '../customer-address/create-customer-address.use-case'

export function makeCreateAddressCustomerUseCase() {
  const customerRepository = RepositoryFactory.makeCustomerRepository()
  const customerAddressRepository =
    RepositoryFactory.makeCustomerAddressRepository()
  const createCustomerAddressUseCase = new CreateCustomerAddressUseCase(
    customerAddressRepository,
    customerRepository,
  )

  return createCustomerAddressUseCase
}
