import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class RolesService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createRoleDto: CreateRoleDto) {
    return this.prismaService.roles.create({ data: createRoleDto });
  }

  findAll() {
    return this.prismaService.roles.findMany();
  }

  findOne(id: number) {
    return this.prismaService.roles.findFirstOrThrow({
      where: { role_id: id },
    });
  }

  getRoleByValue(value: string) {
    return this.prismaService.roles.findFirstOrThrow({
      where: { role: value },
    });
  }

  addUserToRole(role: string, userId: number) {
    return this.prismaService.roles.update({
      where: { role: role },
      data: { user_id: { push: userId } },
    });
  }

  remove(id: number) {
    return this.prismaService.roles.delete({ where: { role_id: id } });
  }
}
