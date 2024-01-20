import { Pool } from 'pg'
import { ICustomerAddressRepository } from './interfaces/customer-address-repository-interface'
import { CustomerAddress } from '@/use-cases/customer/interfaces/customer-address-interface'

export class CustomerAddressRepository implements ICustomerAddressRepository {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  async findManySorted(): Promise<CustomerAddress[] | []> {
    try {
      const queryResult = await this.pool.query(`
        SELECT
            c.name,
            c.phone,
            c.email,
            a.street,
            a.number,
            a.neighborhood,
            a.city,
            ST_Distance(
                ST_MakePoint(-46.326194, -23.957685)::geography, 
                ST_MakePoint(a.longitude, a.latitude)::geography
            ) as distance
        FROM
            customers c
        JOIN
            addresses a ON c.id = a.customer_id
        order by distance;
      `)
      const customers: CustomerAddress[] = queryResult.rows

      return customers
    } catch (error) {
      console.error('Error to list customer:', error)
      throw error
    }
  }
}
