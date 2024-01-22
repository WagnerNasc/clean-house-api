import { CustomerAddress } from '@/use-cases/interfaces/customer-address-interface'

export interface ICustomerAddressRepository {
  findManySorted(): Promise<CustomerAddress[] | []>
  create(customer: CustomerAddress): Promise<void>
}
