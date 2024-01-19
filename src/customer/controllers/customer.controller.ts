import createCustomerUseCase from "../use-cases/create-customer.use-case"
import listCustomerUseCase from "../use-cases/list-customer.use-case"

class CustomerController {
  private static instance: CustomerController
  public static getInstance(): CustomerController { 
    if(!CustomerController.instance) {
      CustomerController.instance = new CustomerController()
    }

    return CustomerController.instance
  }

   async listCustomers(req: any, res: any) {
    const customer = await listCustomerUseCase.execute()

    return res.json(customer)
  }

  async createCustomer(req: any, res: any) {
    const customer = {
      firstName: 'Teste',
      lastName: 'Doe',
      email: 'teste.doe@example.com',
      phone: '123-456-7890'
    }
    
    await createCustomerUseCase.execute(customer)
    

    return res.status(204).json({
      message: 'created successfully.'
    })
  }
}

export default CustomerController.getInstance() 