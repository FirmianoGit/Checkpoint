/* eslint-disable @typescript-eslint/no-unused-vars */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsuarioModule } from 'src/persistence/modules/usuario.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
//import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './Strategies/local.strategy';
import { DepartamentoModule } from 'src/persistence/modules/departamento.module';
//import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';

@Module({
  imports: [UsuarioModule, PassportModule, DepartamentoModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
