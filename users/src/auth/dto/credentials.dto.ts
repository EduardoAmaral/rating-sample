import { IsEmail, IsString, Length } from 'class-validator';

export class CredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 32)
  password: string;
}
