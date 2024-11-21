import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRegistroDto {
  @IsNumber()
  @IsNotEmpty()
  idUsuario: number;

  @IsNotEmpty()
  @IsNumber()
  latitude: string;

  @IsNotEmpty()
  @IsNumber()
  longitude: string;
}
