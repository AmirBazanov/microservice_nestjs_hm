import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RabbitmqConfigModule } from '@app/rabbitmq-config';
import { UsersModule } from '@app/users';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../../libs/configs/jwt.config';

@Module({
  imports: [
    RabbitmqConfigModule.registerRmq('PROFILE_SERVICE', 'profile_queue'),
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
