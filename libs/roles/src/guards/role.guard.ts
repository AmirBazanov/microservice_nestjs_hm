import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { JwtService } from '@nestjs/jwt';
import { NOT_ENOUGH_PERMISSION } from '../../../constants/roles.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (!bearer || !token)
      throw new UnauthorizedException(NOT_ENOUGH_PERMISSION);
    const user: { [p: string]: any } | string = this.jwtService.decode(token);
    return (
      requiredRoles.some(
        (role) => role === 'Owner' && this.isOwner(request, user['userId']),
      ) || requiredRoles.some((role) => user['role'] === role)
    );
  }

  private isOwner(request: any, toke_id: number) {
    const httpMethod = request.method;
    const httpParam = request.params;
    const httpBody = request.body;
    if ((httpMethod === 'GET' || 'Delete') && httpParam['id'] == toke_id) {
      return true;
    }
    if (httpBody['user_id'] == toke_id) {
      return true;
    }
  }
}
