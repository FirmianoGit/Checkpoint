/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../DataBase/data-base.module';
import { UsuarioModule } from 'src/modules/usuario.module';

@Module({
  imports: [DatabaseModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
