import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { ApiService } from './api.service';
import { RabbitmqConfigModule } from '@app/rabbitmq-config';
import { ProfileController } from './controllers/profile.controller';
import { JwtModule } from '@nestjs/jwt';
import { RolesModule } from '@app/roles';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../../libs/configs/jwt.config';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    RabbitmqConfigModule.registerRmq('AUTH_SERVICE', 'auth_queue'),
    RabbitmqConfigModule.registerRmq('PROFILE_SERVICE', 'profile_queue'),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    PassportModule,
    RolesModule,
  ],
  controllers: [AuthController, ProfileController],
  providers: [ApiService, JwtStrategy],
})
export class ApiModule {}
