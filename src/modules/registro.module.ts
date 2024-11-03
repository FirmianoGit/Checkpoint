import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/DataBase/data-base.module';
import { EntityProviders } from 'src/providers/providers';
import { RegistroController } from '../controllers/registro.controller';
import { RegistroService } from '../services/registro.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RegistroController],
  providers: [RegistroService, ...EntityProviders],
})
export class RegistroModule {}
