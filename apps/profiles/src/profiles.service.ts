import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateProfileDto } from '../../../libs/dto/create-profile.dto';
import { UpdateProfileDto } from '../../../libs/dto/update-profile.dto';
import { CreateUserDto } from '../../../libs/dto/create-user.dto';
import { UsersService } from '@app/users';

@Injectable()
export class ProfilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
  ) {}
  async create(
    createProfileDto: CreateProfileDto,
    createUserDto: CreateUserDto,
  ) {
    const user = await this.userService.create(createUserDto);
    return this.prisma.profiles.create({
      data: {
        ...createProfileDto,
        user: {
          connect: {
            user_id: user.user_id,
          },
        },
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.profiles.findMany({
      include: { user: { select: { email: true, role: true } } },
    });
  }

  findOne(id: number) {
    return this.prisma.profiles.findFirstOrThrow({
      where: { profile_id: id },
      include: { user: { select: { email: true, role: true } } },
    });
  }

  findOneByUserId(id: number) {
    return this.prisma.profiles.findFirstOrThrow({
      where: { user_id: id },
      include: { user: { select: { email: true, role: true } } },
    });
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return this.prisma.profiles.update({
      data: updateProfileDto,
      where: { profile_id: id },
      include: { user: { select: { email: true, role: true } } },
    });
  }

  updateByUserId(id: number, updateProfileDto: UpdateProfileDto) {
    return this.prisma.profiles.update({
      data: updateProfileDto,
      where: { user_id: id },
      include: { user: { select: { email: true, role: true } } },
    });
  }

  remove(id: number) {
    return this.prisma.profiles.delete({
      where: { profile_id: id },
      include: { user: { select: { email: true, role: true } } },
    });
  }

  removeByUserId(id: number) {
    return this.prisma.profiles.delete({
      where: { user_id: id },
      include: { user: { select: { email: true, role: true } } },
    });
  }
}
