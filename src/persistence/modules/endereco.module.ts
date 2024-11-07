import { Module } from '@nestjs/common';
import { EntityProviders } from 'src/providers/providers';
import { EnderecoController } from '../controllers/endereco.controller';
import { EnderecoService } from '../services/endereco.service';
import { DatabaseModule } from 'src/DataBase/data-base.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EnderecoController],
  providers: [EnderecoService, ...EntityProviders],
})
export class EnderecoModule {}
