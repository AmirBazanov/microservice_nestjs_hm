import { Controller, Get, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { RabbitmqConfigService } from '@app/rabbitmq-config';
import { RegistrationDto } from '../../../libs/dto/registration.dto';
import { LoginDto } from '../../../libs/dto/login.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly rabbitService: RabbitmqConfigService,
  ) {}
  @MessagePattern({ cmd: 'registration' })
  async register(@Ctx() context, @Payload() registrationDto: RegistrationDto) {
    this.rabbitService.acknowledgeMessage(context);
    return this.authService.register(registrationDto);
  }

  @MessagePattern({ cmd: 'login' })
  async login(@Ctx() context, @Payload() loginDto: LoginDto) {
    this.rabbitService.acknowledgeMessage(context);
    return this.authService.login(loginDto);
  }
}
