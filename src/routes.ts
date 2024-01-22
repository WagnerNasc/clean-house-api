import express from 'express'
import { CustomerController } from './controllers/customer.controller'

const routes = express.Router()

/* Customer */
routes.get('/customers', CustomerController.listCustomers)
routes.post('/customer', CustomerController.createCustomer)

/* Customer Address */
routes.get(
  '/customer-addresses',
  CustomerController.listCustomerAddressesSorted,
)
routes.post('/customer-address', CustomerController.createCustomerAddress)

export default routes
