import { Customer } from '../interfaces/customer-interface'
import { ICustomerRepository } from '@/repositories/interfaces/customer-repository-interface'

interface ListCustomerUseCaseRequest {
  page: number
  filter?: string
}

export class ListCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  public async execute({
    filter,
    page,
  }: ListCustomerUseCaseRequest): Promise<{ data: Customer[]; total: number }> {
    return this.customerRepository.findManyWithFilter(page, filter)
  }
}
