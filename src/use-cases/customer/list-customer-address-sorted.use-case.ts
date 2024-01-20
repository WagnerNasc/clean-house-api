import { ICustomerAddressRepository } from '@/repositories/interfaces/customer-address-repository-interface'
import { CustomerAddress } from './interfaces/customer-address-interface'

export class ListCustomerAddressSortedUseCase {
  constructor(private customerAddressRepository: ICustomerAddressRepository) {}

  public async execute(): Promise<CustomerAddress[]> {
    return this.customerAddressRepository.findManySorted()
  }
}
