import { profiles, users } from '@prisma/client';
import { IsEmail, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class User implements Omit<users, 'user_id' | 'refresh_token' | 'role'> {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}

export class RegistrationDto
  implements Omit<profiles, 'profile_id' | 'user_id'>
{
  @IsString()
  first_name: string;
  @IsString()
  second_name: string;
  @IsString()
  surname: string;
  @IsString()
  phone_number: string;
  @IsString()
  bio: string;

  @ValidateNested({ each: true })
  @Type(() => User)
  user: User;
}
