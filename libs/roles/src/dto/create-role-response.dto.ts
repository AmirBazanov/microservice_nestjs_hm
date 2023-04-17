import { roles } from '@prisma/client';

export class CreateRoleResponseDto implements roles {
  role: string;

  role_id: number;

  user_id: number[];
}
