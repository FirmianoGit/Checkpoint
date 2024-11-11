import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateEmpresaDto {
  @IsNotEmpty()
  @IsString()
  nomeFantasia: string;

  @IsNotEmpty()
  @IsString()
  razaoSocial: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => (value ? value.replace(/[^\d]/g, '') : value))
  cnpj: string;

  @IsNotEmpty()
  @IsString()
  senha: string;

  @IsNotEmpty()
  @IsNumber()
  enderecoEmpresaId: number;

  @IsNotEmpty()
  @IsNumber()
  latitude: string | null;

  @IsNotEmpty()
  @IsNumber()
  longitude: string | null;
}
