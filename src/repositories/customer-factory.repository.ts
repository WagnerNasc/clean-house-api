import { Database } from '../infra/database'
import { CustomerAddressRepository } from './customer-address.repository'
import { CustomerRepository } from './customer.repository'
import { Pool } from 'pg'

export class RepositoryFactory {
  private static pool: Pool = Database.getPool()

  static makeCustomerRepository(): CustomerRepository {
    return new CustomerRepository(this.pool)
  }

  static makeCustomerAddressRepository(): CustomerAddressRepository {
    return new CustomerAddressRepository(this.pool)
  }
}
