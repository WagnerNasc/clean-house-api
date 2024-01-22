import { Pool } from 'pg'
import { ICustomerAddressRepository } from './interfaces/customer-address-repository-interface'
import { CustomerAddress } from '@/use-cases/interfaces/customer-address-interface'
import { Customer } from '../use-cases/interfaces/customer-interface'
import { randomUUID as uuid } from 'crypto'

export class CustomerAddressRepository implements ICustomerAddressRepository {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  async findManySorted(): Promise<CustomerAddress[] | []> {
    try {
      const queryResult = await this.pool.query(`
        SELECT
            c.id,
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
            customer_addresses a ON c.id = a.customer_id
        order by distance;
      `)
      const customers: CustomerAddress[] = queryResult.rows

      return customers
    } catch (error) {
      console.error('Error to list customer:', error)
      throw error
    }
  }

  async create(customerAddress: CustomerAddress): Promise<Customer> {
    const client = await this.pool.connect()
    try {
      await client.query('BEGIN')

      const customerId = uuid()
      const customerQuery = {
        text: `
          INSERT INTO customers (id, name, email, phone) 
          VALUES ($1, $2, $3, $4)
          RETURNING *`,
        values: [
          customerId,
          customerAddress.name,
          customerAddress.email,
          customerAddress.phone,
        ],
      }

      const customerResult = await client.query(customerQuery)

      await client.query('COMMIT')

      const customer: Customer = customerResult.rows[0]

      const customerAddressQuery = {
        text: `
          INSERT INTO customer_addresses (id, customer_id, street, number, neighborhood, city, state, postal_code, latitude, longitude) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        values: [
          customerAddress.id,
          customerId,
          customerAddress.street,
          customerAddress.number,
          customerAddress.neighborhood,
          customerAddress.city,
          customerAddress.state,
          customerAddress.postal_code,
          customerAddress.latitude,
          customerAddress.longitude,
        ],
      }

      await client.query(customerAddressQuery)

      await client.query('COMMIT')

      return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      }
    } catch (error) {
      await client.query('ROLLBACK')
      console.error('Error to create customer address:', error)
      throw error
    } finally {
      client.release()
    }
  }
}
