import customerRepository from "../repositories/customer.repository"

class ListCustomerUseCase {
  private static instance: ListCustomerUseCase
  public static getInstance(): ListCustomerUseCase { 
    if(!ListCustomerUseCase.instance) {
      ListCustomerUseCase.instance = new ListCustomerUseCase()
    }

    return ListCustomerUseCase.instance
  }

  public async execute() {
    return customerRepository.list()
  }
}

export default ListCustomerUseCase.getInstance()