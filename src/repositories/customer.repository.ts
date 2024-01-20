import { Pool } from 'pg'
import { Customer } from '../use-cases/customer/interfaces/customer-interface'
import { ICustomerRepository } from './interfaces/customer-repository-interface'
import { randomUUID as uuid } from 'crypto'

export class CustomerRepository implements ICustomerRepository {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  async findByEmail(email: string): Promise<Customer | null> {
    try {
      const queryResult = await this.pool.query(
        `SELECT * FROM customers WHERE email = $1`,
        [email],
      )

      const customers: Customer[] = queryResult.rows

      if (customers.length === 0) {
        return null
      }

      const customer: Customer = customers[0]

      return customer
    } catch (error) {
      console.error('Error to list customer:', error)
      throw error
    }
  }

  async findMany(): Promise<Customer[] | []> {
    try {
      const queryResult = await this.pool.query(`
      SELECT
          c.name,
          c.phone,
          c.email
      FROM
          customers c
      `)
      const customers: Customer[] = queryResult.rows

      return customers
    } catch (error) {
      console.error('Error to list customer:', error)
      throw error
    }
  }

  async create(customer: Customer): Promise<void> {
    try {
      const query = {
        text: `
          INSERT INTO customers (id, name, email, phone) 
          VALUES ($1, $2, $3, $4)`,
        values: [uuid(), customer.name, customer.email, customer.phone],
      }

      await this.pool.query(query)
    } catch (error) {
      console.error('Error to create customer:', error)
      throw error
    }
  }
}
