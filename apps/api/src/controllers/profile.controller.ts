import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Roles } from '@app/roles/decorators/role.decorator';
import { UpdateProfileDto } from '../../../../libs/dto/update-profile.dto';
import { RolesGuard } from '@app/roles';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('profile')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe())
export class ProfileController {
  constructor(
    @Inject('PROFILE_SERVICE') private readonly profilesService: ClientProxy,
  ) {}
  @Roles('Admin')
  @Get()
  findAll() {
    return this.profilesService.send({ cmd: 'find-all' }, []);
  }

  @Roles('Admin', 'Owner')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.send({ cmd: 'find-by-profileid' }, +id);
  }

  @Roles('Admin', 'Owner')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.send({ cmd: 'update-by-profileid' }, [
      updateProfileDto,
      +id,
    ]);
  }

  @Roles('Admin', 'Owner')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.send({ cmd: 'remove-by-profileid' }, +id);
  }
  @Roles('Admin', 'Owner')
  @Get('/user/:id')
  findOneByUserId(@Param('id') id: string) {
    return this.profilesService.send({ cmd: 'find-by-userid' }, +id);
  }
  @Roles('Admin', 'Owner')
  @Patch('/user/:id')
  updateByUserId(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.send({ cmd: 'update-by-userid' }, [
      updateProfileDto,
      +id,
    ]);
  }
  @Roles('Admin', 'Owner')
  @Delete('/user/:id')
  removeByUserId(@Param('id') id: string) {
    return this.profilesService.send({ cmd: 'remove-by-userid ' }, +id);
  }
}
