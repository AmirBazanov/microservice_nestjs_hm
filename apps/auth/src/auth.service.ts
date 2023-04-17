import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { RegistrationDto } from '../../../libs/dto/registration.dto';
import { UsersService } from '@app/users';
import { LoginDto } from '../../../libs/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @Inject('PROFILE_SERVICE') private readonly profileService: ClientProxy,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegistrationDto) {
    const { email, password, ...profileDto } = data;
    return this.profileService.send({ cmd: 'create-profile' }, [
      profileDto,
      { email, password },
    ]);
  }

  async login(data: LoginDto) {
    const validatedUser = await this.userService.validateUser(data);
    const { role, ...user } = validatedUser;
    return this.getTokens(user, role);
  }

  async getTokens(user, role: string) {
    const payload = { email: user.email, userId: user.user_id, role: role };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    await this.userService.updateToken(user.user_id, refresh_token);

    return { access_token: token, refresh_token: refresh_token };
  }
}
