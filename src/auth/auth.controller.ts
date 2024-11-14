import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './Guards/local-auth.guard';
import { LocalAuthDTO } from './auth-models/local-auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDTO: LocalAuthDTO) {
    return this.authService.retornarUsuario(loginDTO);
  }
}
