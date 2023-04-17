import { users } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto
  implements Omit<users, 'user_id' | 'refresh_token' | 'role'>
{
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
