import { IsNumber, IsString } from 'class-validator';

export class BindRoleDto {
  @IsNumber()
  user_id: number;
  @IsString()
  role: string;
}
