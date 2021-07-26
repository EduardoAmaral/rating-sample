import { EntityRepository, Repository } from 'typeorm';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from './model/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(credentials: CredentialsDto): Promise<User> {
    const { email, password } = credentials;
    const user = this.create({ email, password });
    return this.save(user);
  }
}
