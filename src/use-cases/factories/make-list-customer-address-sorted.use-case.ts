import { RepositoryFactory } from '../../repositories/customer-factory.repository'
import { ListCustomerAddressSortedUseCase } from '../customer-address/list-customer-address-sorted.use-case'

export function makeListCustomerAddressUseCase() {
  const customerAddressRepository =
    RepositoryFactory.makeCustomerAddressRepository()
  const listCustomerAddressUseCase = new ListCustomerAddressSortedUseCase(
    customerAddressRepository,
  )

  return listCustomerAddressUseCase
}
