import { users } from '@prisma/client';
import { IsString } from 'class-validator';
export class LoginDto
  implements Omit<users, 'user_id' | 'refresh_token' | 'role'>
{
  @IsString()
  email: string;
  @IsString()
  password: string;
}
