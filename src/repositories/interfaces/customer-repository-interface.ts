import { Customer } from '@/use-cases/customer/interfaces/customer-interface'

export interface ICustomerRepository {
  findByEmail(email: string): Promise<Customer | null>
  findManyWithFilter(
    page: number,
    filter?: string,
  ): Promise<{ data: Customer[]; total: number }>
  create(customer: Customer): Promise<void>
}
