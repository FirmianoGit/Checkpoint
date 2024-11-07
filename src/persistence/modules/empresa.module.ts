import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/DataBase/data-base.module';
import { EntityProviders } from 'src/providers/providers';
import { EmpresaController } from '../controllers/empresa.controller';
import { EmpresaService } from '../services/empresa.service';

@Module({
  imports: [DatabaseModule],
  exports: [EmpresaService],
  controllers: [EmpresaController],
  providers: [EmpresaService, ...EntityProviders],
})
export class EmpresaModule {}
