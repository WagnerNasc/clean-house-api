import { CustomerRepository } from '@/repositories/customer.repository'
import { Customer } from './interfaces/customer-interface'
import { CustomerAlreadyExists } from '../errors/customer-alredy-exists'

export class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  public async execute(customer: Customer) {
    console.log(customer)
    const userWithSameEmail = await this.customerRepository.findByEmail(
      customer.email,
    )

    if (userWithSameEmail) {
      throw new CustomerAlreadyExists()
    }

    await this.customerRepository.create(customer)
  }
}
