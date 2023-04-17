import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @IsOptional()
  @IsNumber()
  user_id: number;
  @IsOptional()
  @IsNumber()
  profile_id: number;
  @IsOptional()
  @IsString()
  bio: string;
  @IsOptional()
  @IsString()
  first_name: string;
  @IsOptional()
  @IsString()
  phone_number: string;
  @IsOptional()
  @IsString()
  second_name: string;
  @IsOptional()
  @IsString()
  surname: string;
}
