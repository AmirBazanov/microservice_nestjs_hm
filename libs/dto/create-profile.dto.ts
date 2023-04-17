import { profiles } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateProfileDto
  implements Omit<profiles, 'profile_id' | 'user_id'>
{
  @IsString()
  bio: string;
  @IsString()
  first_name: string;
  @IsString()
  phone_number: string;
  @IsString()
  second_name: string;
  @IsString()
  surname: string;
}
