import { Controller, Get, Inject } from '@nestjs/common';
import { ApiService } from './api.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('PROFILE_SERVICE') private readonly profileService: ClientProxy,
  ) {}

  @Get()
  async getHello() {
    return this.authService.send({ cmd: 'create-user' }, 'HELOOOO');
  }

  @Get('/profiles')
  async getProfiles() {
    return this.profileService.send({ cmd: 'get-profiles' }, {});
  }
}
