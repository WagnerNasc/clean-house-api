import customerRepository from "../repositories/customer.repository"


export interface CreateCustomerUseCaseRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
}

class CreateCustomerUseCase {
  private static instance: CreateCustomerUseCase
  public static getInstance(): CreateCustomerUseCase { 
    if(!CreateCustomerUseCase.instance) {
      CreateCustomerUseCase.instance = new CreateCustomerUseCase()
    }

    return CreateCustomerUseCase.instance
  }

  public async execute(customer: CreateCustomerUseCaseRequest) {
    await customerRepository.create(customer)
  }
}

export default CreateCustomerUseCase.getInstance()