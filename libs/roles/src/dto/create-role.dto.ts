import { roles } from '@prisma/client';
import { IsString } from 'class-validator';
export class CreateRoleDto implements Omit<roles, 'role_id' | 'user_id'> {
  @IsString()
  role: string;
}
