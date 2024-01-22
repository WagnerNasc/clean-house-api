import { CustomerRepository } from '@/repositories/customer.repository'
import { Customer } from '../interfaces/customer-interface'
import { CustomerAlreadyExists } from '../errors/customer-alredy-exists'
import { OmitProps } from '@/helpers/Omit'
import { randomUUID as uuid } from 'crypto'

export class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  public async execute(customer: OmitProps<Customer, 'id'>) {
    const userWithSameEmail = await this.customerRepository.findByEmail(
      customer.email,
    )

    if (userWithSameEmail) {
      throw new CustomerAlreadyExists()
    }

    const newCustomer: Customer = {
      id: uuid(),
      ...customer,
    }
    await this.customerRepository.create(newCustomer)
  }
}
