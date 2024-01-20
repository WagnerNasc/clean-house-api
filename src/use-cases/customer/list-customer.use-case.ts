import { Customer } from './interfaces/customer-interface'
import { ICustomerRepository } from '@/repositories/interfaces/customer-repository-interface'

export class ListCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  public async execute(): Promise<Customer[]> {
    return this.customerRepository.findMany()
  }
}
