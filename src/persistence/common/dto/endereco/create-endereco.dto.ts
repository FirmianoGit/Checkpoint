import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEnderecoDto {
  @IsNumber()
  id: number;

  @IsNumber()
  empresaId: number;

  @IsNumber()
  usuarioId: number;

  @IsNotEmpty()
  @IsString()
  logradouro: string;

  @IsNotEmpty()
  @IsString()
  numero: string;

  @IsString()
  complemento: string;

  @IsNotEmpty()
  @IsString()
  bairro: string;

  @IsNotEmpty()
  @IsString()
  cidade: string;

  @IsNotEmpty()
  @IsString()
  estado: string;

  @IsNotEmpty()
  @IsString()
  cep: string;

  @IsNotEmpty()
  @IsString()
  pais: string;
}
