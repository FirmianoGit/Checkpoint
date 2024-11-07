import { Module } from '@nestjs/common';
import { DepartamentoService } from '../services/departamento.service';
import { DepartamentoController } from '../controllers/departamento.controller';
import { EntityProviders } from 'src/providers/providers';
import { DatabaseModule } from 'src/DataBase/data-base.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DepartamentoController],
  providers: [DepartamentoService, ...EntityProviders],
})
export class DepartamentoModule {}
