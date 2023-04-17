import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { RolesService } from '@app/roles';
import { CreateUserDto } from '../../dto/create-user.dto';
import { compare, genSalt, hash } from 'bcrypt';
import {
  USER_ALREADY_EXIST,
  USER_NOT_FOUND,
} from '../../constants/user.constants';
import { LoginDto } from '../../dto/login.dto';
import { WRONG_PASS_OR_LOGIN } from 'libs/constants/auth.constants';
import { BindRoleDto } from '../../dto/bind-role.dto';
import {
  ROLE_NOT_FOUND,
  USER_ALREADY_GOT_ROLE,
} from '../../constants/roles.constants';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly roleService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await genSalt(10);
    let result;
    try {
      result = await this.prismaService.users.create({
        data: {
          email: createUserDto.email,
          password: await hash(createUserDto.password, salt),
          roles: {
            connectOrCreate: {
              create: { role: 'User' },
              where: { role: 'User' },
            },
          },
        },
        select: { user_id: true, role: true, email: true },
      });
    } catch (e) {
      console.log(e);
      throw new ConflictException(USER_ALREADY_EXIST);
    }
    return result;
  }

  async validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.findOneByEmail(email);
    if (!user) throw new UnauthorizedException(WRONG_PASS_OR_LOGIN);
    if (await compare(password, user.password)) {
      return user;
    }
    throw new UnauthorizedException(WRONG_PASS_OR_LOGIN);
  }

  async bindRoleToUser(data: BindRoleDto) {
    let updatedUSer;
    const roleObj = await this.roleService.getRoleByValue(data.role);
    if (roleObj && !roleObj.user_id.includes(data.user_id)) {
      try {
        updatedUSer = await this.prismaService.users.update({
          where: { user_id: data.user_id },
          data: {
            roles: { connect: { role: roleObj.role } },
          },
          select: { user_id: true, email: true, role: true },
        });
      } catch (e) {
        throw new NotFoundException(USER_NOT_FOUND);
      }
      await this.roleService.addUserToRole(roleObj.role, updatedUSer.user_id);
      return updatedUSer;
    } else if (roleObj?.user_id.includes(data.user_id)) {
      throw new ConflictException(USER_ALREADY_GOT_ROLE + data.role);
    }
    throw new NotFoundException(ROLE_NOT_FOUND);
  }

  findAll() {
    return this.prismaService.users.findMany({
      select: { user_id: true, email: true, role: true },
    });
  }

  findOneById(id: number) {
    return this.prismaService.users.findFirstOrThrow({
      where: { user_id: id },
      select: { user_id: true, email: true },
    });
  }

  getRefreshTokenById(id: number) {
    return this.prismaService.users.findFirstOrThrow({
      where: { user_id: id },
      select: { refresh_token: true },
    });
  }

  findOneByEmail(email: string) {
    return this.prismaService.users.findFirstOrThrow({
      where: { email: email },
      select: {
        email: true,
        password: true,
        refresh_token: true,
        user_id: true,
        role: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const salt = await genSalt(10);
    return this.prismaService.users.update({
      data: {
        ...updateUserDto,
        password: await hash(updateUserDto.password, salt),
      },
      where: { user_id: id },
      select: { email: true, role: true, user_id: true, profiles: true },
    });
  }

  async updateToken(id: number, token: string) {
    return this.prismaService.users.update({
      data: { refresh_token: token },
      where: { user_id: id },
    });
  }

  async remove(id: number) {
    return this.prismaService.users.delete({
      where: { user_id: id },
      select: { user_id: true, email: true, role: true },
    });
  }
}
