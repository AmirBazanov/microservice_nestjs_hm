import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'nestjs-prisma';
import { RolesModule } from '@app/roles';

@Module({
  providers: [UsersService],
  imports: [PrismaModule, RolesModule],
  exports: [UsersService],
})
export class UsersModule {}
