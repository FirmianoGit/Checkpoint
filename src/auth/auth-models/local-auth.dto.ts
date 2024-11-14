import { IsString } from 'class-validator';

export class LocalAuthDTO {
  @IsString()
  email: string;
  @IsString()
  senha: string;
}
