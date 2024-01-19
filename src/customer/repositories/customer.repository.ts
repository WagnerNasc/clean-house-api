import database from "../../infra/database"
import { CreateCustomerUseCaseRequest } from "../use-cases/create-customer.use-case"

class CustomerRepository {
  private static instance: CustomerRepository
  public static getInstance(): CustomerRepository { 
    if(!CustomerRepository.instance) {
      CustomerRepository.instance = new CustomerRepository()
    }

    return CustomerRepository.instance
  }

  async list() {
    const customers = await database.client.query(`
      SELECT * FROM customers;
    `)

    return customers
  }


  async create(customer: CreateCustomerUseCaseRequest) {
    const query = {
      text: 'INSERT INTO customers (first_name, last_name, email, phone_number) VALUES ($1, $2, $3, $4)',
      values: [customer.firstName, customer.lastName, customer.email, customer.phone],
    }

    await database.client.query(query)
  }
}

export default CustomerRepository.getInstance()