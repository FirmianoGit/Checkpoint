import { IsNumber, IsString } from 'class-validator';

export class CreateDepartamentoDto {
  @IsNumber()
  empresaId: number;
  @IsString()
  nome: string;
}
