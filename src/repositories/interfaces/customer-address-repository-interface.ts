import { CustomerAddress } from '@/use-cases/customer/interfaces/customer-address-interface'

export interface ICustomerAddressRepository {
  findManySorted(): Promise<CustomerAddress[] | []>
}
