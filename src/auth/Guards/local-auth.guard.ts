/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info: Error, context: ExecutionContext) {
    if (err) {
      throw err || new UnauthorizedException('Credenciais inválidas');
    }
    return user; // Deve retornar o usuário autenticado
  }
}
