import { Module } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioController } from 'src/controllers/usuario.controller';
import { DatabaseModule } from 'src/DataBase/data-base.module';
import { usuarioProviders } from 'src/providers/usuario.provider';

@Module({
  imports: [DatabaseModule],
  exports: [UsuarioService],
  controllers: [UsuarioController],
  providers: [UsuarioService, ...usuarioProviders],
})
export class UsuarioModule {}
