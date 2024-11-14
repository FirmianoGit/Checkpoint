/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from '../common/dto/usuario/create-usuario.dto';
import { UpdateUsuarioDto } from '../common/dto/usuario/update-usuario.dto';
import { Repository } from 'typeorm';
import { Usuario } from 'src/DataBase/entities/Usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  // Injetando o repositório do usuário com o uso de 'USUARIO_REPOSITORY'
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  // Método para criar um novo usuário
  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      // Cria uma nova instância de usuário com dados do DTO e senha criptografada
      const novoUsuario: Usuario = this.usuarioRepository.create({
        ...createUsuarioDto,
        senha: await bcrypt.hash(createUsuarioDto.senha, 10),
      });

      // Salva o novo usuário no banco de dados
      this.usuarioRepository.save(novoUsuario);

      // Retorna o usuário criado, mas oculta o campo senha
      return {
        ...novoUsuario,
        senha: undefined,
      };
    } catch {
      // Lança uma exceção caso haja erro na criação do usuário
      throw new NotAcceptableException(
        `O usuario não pode ser criado, verifique se as informações estão corretas`,
      );
    }
  }

  // Método para buscar todos os usuários
  async findAll(): Promise<Usuario[]> {
    try {
      const usuarios = await this.usuarioRepository.find();

      // Verifica se há usuários retornados
      if (!usuarios || usuarios.length === 0) {
        throw new Error('Nenhum usuário encontrado');
      }

      usuarios.forEach((usuario) => {
        usuario.senha = undefined;
        usuario.cpf = undefined;
        usuario.rg = undefined;
      });

      return usuarios;
    } catch (error) {
      // Lança uma exceção personalizada em caso de erro
      throw new Error(`Erro ao buscar usuários: ${error.message}`);
    }
  }

  // Método para buscar um usuário pelo ID
  async findOne(id: number): Promise<Usuario> {
    try {
      const usuarioEncontrado = await this.usuarioRepository.findOne({
        where: { id },
      });

      // Lança exceção se o usuário não for encontrado
      if (!usuarioEncontrado) {
        throw new NotFoundException(`Usuário com o ID ${id} não encontrado`);
      }

      return {
        ...usuarioEncontrado,
        senha: undefined,
        cpf: undefined,
        rg: undefined,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Relança a exceção de usuário não encontrado
        throw error;
      } else {
        // Captura erros inesperados e lança uma exceção interna
        console.error('Erro ao buscar usuário:', error);
        throw new InternalServerErrorException(
          'Erro ao buscar o usuário no banco de dados. Tente novamente mais tarde.',
        );
      }
    }
  }

  // Método para atualizar um usuário existente
  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    try {
      // Busca o usuário antes de atualizá-lo
      const usuarioAchado = await this.findOne(id);

      if (!usuarioAchado) {
        throw new NotFoundException(`Usuário com o ID ${id} não encontrado`);
      }

      // Mescla as alterações do DTO com o usuário encontrado
      this.usuarioRepository.merge(usuarioAchado, updateUsuarioDto);

      try {
        // Salva as alterações no banco de dados, omitindo campos sensíveis
        return await this.usuarioRepository.save({
          ...usuarioAchado,
          senha: undefined,
          cpf: undefined,
          rg: undefined,
        });
      } catch (saveError) {
        console.error('Erro ao salvar o usuário atualizado:', saveError);
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário atualizado. Tente novamente mais tarde.',
        );
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        console.error('Erro ao atualizar o usuário:', error);
        throw new InternalServerErrorException(
          'Erro ao atualizar o usuário. Tente novamente mais tarde.',
        );
      }
    }
  }

  // Método para remover um usuário pelo ID
  async remove(id: number) {
    try {
      const usuarioAchado = await this.findOne(id);

      if (!usuarioAchado) {
        throw new NotFoundException(`Usuário com o ID ${id} não encontrado`);
      }

      try {
        // Remove o usuário encontrado do banco de dados
        await this.usuarioRepository.remove(usuarioAchado);
      } catch (removeError) {
        console.error('Erro ao deletar o usuário:', removeError);
        throw new InternalServerErrorException(
          'Erro ao deletar o usuário. Tente novamente mais tarde.',
        );
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        console.error('Erro ao buscar o usuário para deleção:', error);
        throw new InternalServerErrorException(
          'Erro ao buscar o usuário para deleção. Tente novamente mais tarde.',
        );
      }
    }
  }

  async ListarUsuarioPorLogin(chave: string): Promise<Usuario> {
    return this.usuarioRepository.findOne({ where: { email: chave } });
  }
}
