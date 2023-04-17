import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { RabbitmqConfigModule } from '@app/rabbitmq-config';
import { UsersModule } from '@app/users';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [RabbitmqConfigModule, PrismaModule.forRoot(), UsersModule],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
