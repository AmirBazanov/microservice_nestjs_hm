import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiService } from '../api.service';
import { ClientProxy } from '@nestjs/microservices';
import { RegistrationDto } from '../../../../libs/dto/registration.dto';
import { LoginDto } from '../../../../libs/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly apiService: ApiService,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() registrationDto: RegistrationDto) {
    return this.authService.send({ cmd: 'registration' }, registrationDto);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.send({ cmd: 'login' }, loginDto);
  }
}
