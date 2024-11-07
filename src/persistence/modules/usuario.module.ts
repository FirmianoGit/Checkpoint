import { Module } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioController } from 'src/persistence/controllers/usuario.controller';
import { DatabaseModule } from 'src/DataBase/data-base.module';
import { EntityProviders } from 'src/providers/providers';

@Module({
  imports: [DatabaseModule],
  exports: [UsuarioService],
  controllers: [UsuarioController],
  providers: [UsuarioService, ...EntityProviders],
})
export class UsuarioModule {}
