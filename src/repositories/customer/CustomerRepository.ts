import { getRepository, Repository } from 'typeorm';
import { ICreateCustomerDTO } from '../../dtos/ICreateCustomerDTO';
import Customer from '../../models/Customer';
import ICustomerRepository from './ICustomerRepository';

class UserRepository implements ICustomerRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async findById(id: string): Promise<Customer | undefined> {
    return this.ormRepository.findOne({
      where: { id },
    });
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async create({
    name,
    email,
    cpf,
    telephone,
  }: ICreateCustomerDTO): Promise<Customer> {
    const user = this.ormRepository.create({
      name,
      email,
      cpf,
      phone: telephone,
      active: true,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(customer: Customer): Promise<Customer> {
    return this.ormRepository.save(customer);
  }
}

export default UserRepository;
