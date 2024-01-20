import { ZodError, z } from 'zod'
import { CustomerAlreadyExists } from '../use-cases/errors/customer-alredy-exists'
import { makeCreateCustomerUseCase } from '../use-cases/factories/make-create-customer.use-case'
import { makeListCustomerUseCase } from '../use-cases/factories/make-list-customer.use-case'
import { Request, Response } from 'express'
import { makeListCustomerAddressUseCase } from '../use-cases/factories/make-list-customer-address-sorted.use-case'

export class CustomerController {
  static async listCustomers(req: Request, res: Response) {
    try {
      const registerQuerySchema = z.object({
        filter: z.string().optional(),
        page: z.coerce.number().min(1).default(1),
      })

      const { filter, page } = registerQuerySchema.parse(req.query)
      const listCustomerUseCase = makeListCustomerUseCase()
      const customer = await listCustomerUseCase.execute({
        filter,
        page,
      })

      return res.json(customer)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  static async listCustomerAddressesSorted(req: Request, res: Response) {
    try {
      const listCustomerAddressUseCase = makeListCustomerAddressUseCase()
      const customerAddress = await listCustomerAddressUseCase.execute()

      return res.json(customerAddress)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  static async createCustomer(req: Request, res: Response) {
    try {
      const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string(),
      })

      const { name, email, phone } = registerBodySchema.parse(req.body)

      const createCustomerUseCase = makeCreateCustomerUseCase()

      await createCustomerUseCase.execute({ name, email, phone })

      return res.status(204).json({
        message: 'created successfully.',
      })
    } catch (error) {
      if (error instanceof CustomerAlreadyExists) {
        return res.status(409).send({ message: error.message })
      }

      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ message: 'Validation error.', issues: error.issues })
      }
      console.error(error)
      throw error
    }
  }
}
