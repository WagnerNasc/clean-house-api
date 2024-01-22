import { CustomerAlreadyExists } from '../errors/customer-alredy-exists'
import { ICustomerAddressRepository } from '@/repositories/interfaces/customer-address-repository-interface'
import { ICustomerRepository } from '@/repositories/interfaces/customer-repository-interface'
import { CustomerAddress } from '../interfaces/customer-address-interface'
import { randomUUID as uuid } from 'crypto'
import { OmitProps } from '@/helpers/Omit'

export class CreateCustomerAddressUseCase {
  constructor(
    private customerAddressRepository: ICustomerAddressRepository,
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute(customerAddress: OmitProps<CustomerAddress, 'id'>) {
    const userWithSameEmail = await this.customerRepository.findByEmail(
      customerAddress.email,
    )

    if (userWithSameEmail) {
      throw new CustomerAlreadyExists()
    }

    const newCustomerAddress: CustomerAddress = {
      id: uuid(),
      ...customerAddress,
    }

    await this.customerAddressRepository.create(newCustomerAddress)
  }
}
