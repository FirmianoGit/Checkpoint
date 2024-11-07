import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRegistroDto } from '../common/dto/registro/create-registro.dto';
import { UpdateRegistroDto } from '../common/dto/registro/update-registro.dto';
import { RegistroService } from '../services/registro.service';

@Controller('registro')
export class RegistroController {
  constructor(private readonly registroService: RegistroService) {}

  @Post()
  create(@Body() createRegistroDto: CreateRegistroDto) {
    return this.registroService.create(createRegistroDto);
  }

  @Get()
  findAll() {
    return this.registroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registroService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegistroDto: UpdateRegistroDto,
  ) {
    return this.registroService.update(+id, updateRegistroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registroService.remove(+id);
  }
}
