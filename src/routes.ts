import express from 'express'
import { CustomerController } from './controllers/customer.controller'

const routes = express.Router()

routes.get('/customers', CustomerController.listCustomers)
routes.get(
  '/customer-addresses',
  CustomerController.listCustomerAddressesSorted,
)
routes.post('/customer', CustomerController.createCustomer)

export default routes
