import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRegistroDto {
  @IsNumber()
  @IsNotEmpty()
  idUsuario: number;

  @IsNumber()
  latitude: string;

  @IsNumber()
  longitude: string;
}
