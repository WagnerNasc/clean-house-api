
import express from 'express'
import customerController from './customer/controllers/customer.controller'

const routes = express.Router()

routes.get('/customers', customerController.listCustomers)
routes.get('/customerCreate', customerController.createCustomer)

export default routes