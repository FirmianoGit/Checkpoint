import { IsEmail, IsNotEmpty } from 'class-validator';

export class AcessarNumeroDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
