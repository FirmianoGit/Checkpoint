import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DepartamentoService } from 'src/persistence/services/departamento.service';
import { UsuarioService } from 'src/persistence/services/usuario.service';
import { LocalAuthDTO } from './auth-models/local-auth.dto';
import { Usuario } from 'src/DataBase/entities/Usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly departamenteService: DepartamentoService,
    private readonly userService: UsuarioService,
  ) {}

  async ValidarUsuario(chave: string, senha: string): Promise<Usuario> {
    const Usuario = await this.userService.ListarUsuarioPorLogin(chave);

    if (Usuario) {
      const SenhaValida = await bcrypt.compare(senha, Usuario.senha);
      console.log(Usuario);
      if (SenhaValida) {
        return {
          ...Usuario,
          senha: undefined,
        };
      }
    }
    throw new UnauthorizedException(
      'Endereço de email ou senha inseridos estão incorretos!',
    );
  }

  async retornarUsuario(loginDTO: LocalAuthDTO) {
    // Busca o usuário pelo e-mail fornecido no DTO
    const usuario = await this.userService.ListarUsuarioPorLogin(
      loginDTO.email,
    );

    // Verifica se o usuário existe antes de tentar acessar seu departamentoId
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    // Busca o departamento do usuário
    const usuarioDepartamento = await this.departamenteService.findOne(
      usuario.departamentoId,
    );

    // Verifica se o departamento foi encontrado
    if (!usuarioDepartamento) {
      throw new Error('Departamento do usuário não encontrado');
    }

    // Retorna os dados do usuário com alguns campos ocultos
    return {
      ...usuario,
      senha: undefined,
      cpf: undefined,
      rg: undefined,
      departamento: usuarioDepartamento.nome,
    };
  }
}
