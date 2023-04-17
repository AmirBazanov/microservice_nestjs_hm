import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';

import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  providers: [RolesService],
  imports: [PrismaModule, JwtModule],
  exports: [RolesService],
})
export class RolesModule {}
