import { ICreateCustomerDTO } from '../../dtos/ICreateCustomerDTO';
import Customer from '../../models/Customer';

export default interface ICustomerRepositoru {
  findById: (id: string) => Promise<Customer | undefined>;
  findByEmail: (email: string) => Promise<Customer | undefined>;
  create: (createCustomerDTO: ICreateCustomerDTO) => Promise<Customer>;
  save: (user: Customer) => Promise<Customer>;
}
