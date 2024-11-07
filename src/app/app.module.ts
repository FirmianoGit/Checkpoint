/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../DataBase/data-base.module';
import { UsuarioModule } from 'src/persistence/modules/usuario.module';
import { EmpresaModule } from 'src/persistence/modules/empresa.module';
import { DepartamentoModule } from 'src/persistence/modules/departamento.module';
import { EnderecoModule } from 'src/persistence/modules/endereco.module';
import { RegistroModule } from 'src/persistence/modules/registro.module';

@Module({
  imports: [
    DatabaseModule,
    UsuarioModule,
    EmpresaModule,
    DepartamentoModule,
    EnderecoModule,
    RegistroModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
