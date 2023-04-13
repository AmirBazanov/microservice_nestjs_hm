import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { RabbitmqConfigModule } from '@app/rabbitmq-config';
import * as process from 'process';

@Module({
  imports: [
    RabbitmqConfigModule.registerRmq('AUTH_SERVICE', 'auth_queue'),
    RabbitmqConfigModule.registerRmq('PROFILE_SERVICE', 'profile_queue'),
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
