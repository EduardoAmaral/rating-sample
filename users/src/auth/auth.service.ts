import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CredentialsDto } from './dto/credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private repository: UserRepository,
  ) {}

  async signUp(credentials: CredentialsDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(credentials.password, salt);
    return this.repository.createUser({
      email: credentials.email,
      password: hashedPassword,
    });
  }
}
