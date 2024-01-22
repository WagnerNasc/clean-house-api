import { CustomerAddress } from '@/use-cases/interfaces/customer-address-interface'
import { Customer } from '@/use-cases/interfaces/customer-interface'

export interface ICustomerAddressRepository {
  findManySorted(): Promise<CustomerAddress[] | []>
  create(customer: CustomerAddress): Promise<Customer>
}
