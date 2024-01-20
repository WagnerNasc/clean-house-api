import { Customer } from '@/use-cases/customer/interfaces/customer-interface'

export interface ICustomerRepository {
  findByEmail(email: string): Promise<Customer | null>
  findMany(): Promise<Customer[] | []>
  create(customer: Customer): Promise<void>
}
