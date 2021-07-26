import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { Token } from './token.interface';

@Controller('api/users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() credentials: CredentialsDto): Promise<Token> {
    return this.authService.signUp(credentials);
  }
}
