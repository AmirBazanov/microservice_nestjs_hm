import { Controller, Get } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { Ctx, MessagePattern, Payload } from '@nestjs/microservices';
import { RabbitmqConfigService } from '@app/rabbitmq-config';
import { UsersService } from '@app/users';
import { UpdateProfileDto } from '../../../libs/dto/update-profile.dto';
import { CreateProfileDto } from '../../../libs/dto/create-profile.dto';

@Controller()
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
    private rabbitService: RabbitmqConfigService,
    private readonly userService: UsersService,
  ) {}

  @MessagePattern({ cmd: 'create-profile' })
  createProfile(@Payload() data, @Ctx() context) {
    this.rabbitService.acknowledgeMessage(context);
    return this.profilesService.create(data[0], data[1]);
  }

  @MessagePattern({ cmd: 'find-all' })
  findAll() {
    return this.profilesService.findAll();
  }

  @MessagePattern({ cmd: 'find-by-profileid' })
  findOne(@Ctx() context, @Payload() id: number) {
    return this.profilesService.findOne(id);
  }

  @MessagePattern({ cmd: 'update-by-profileid' })
  update(@Ctx() context, @Payload() data: [UpdateProfileDto, number]) {
    return this.profilesService.update(data[1], data[0]);
  }

  @MessagePattern({ cmd: 'remove-by-profileid' })
  remove(@Ctx() context, @Payload() id: number) {
    return this.profilesService.remove(id);
  }
  @MessagePattern({ cmd: 'find-by-userid' })
  findOneByUserId(@Ctx() context, @Payload() id: number) {
    return this.profilesService.findOneByUserId(id);
  }
  @MessagePattern({ cmd: 'update-by-userid' })
  updateByUserId(@Ctx() context, @Payload() data: [UpdateProfileDto, number]) {
    return this.profilesService.updateByUserId(data[1], data[0]);
  }
  @MessagePattern({ cmd: 'remove-by-userid ' })
  removeByUserId(@Ctx() context, @Payload() id: number) {
    return this.profilesService.removeByUserId(id);
  }
}
