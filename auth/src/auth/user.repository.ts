import { EntityRepository, Repository } from 'typeorm';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from './model/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(credentials: CredentialsDto): Promise<void> {
    const { email, password } = credentials;
    const user = this.create({ email, password });
    await this.save(user);
  }
}
