import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRegistroDto {
  @IsNumber()
  @IsNotEmpty()
  idUsuario: number;
}
