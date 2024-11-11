import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRegistroDto } from '../common/dto/registro/create-registro.dto';
import { UpdateRegistroDto } from '../common/dto/registro/update-registro.dto';
import { Repository } from 'typeorm';
import { Registro } from 'src/DataBase/entities/Registro.entity';

@Injectable()
export class RegistroService {
  constructor(
    @Inject('REGISTRO_REPOSITORY')
    private readonly registroRepository: Repository<Registro>,
  ) {}

  async create(createRegistroDto: CreateRegistroDto) {
    try {
      // Cria uma nova instância de Registro com os dados do DTO
      const novoRegistro: Registro =
        this.registroRepository.create(createRegistroDto);

      // Salva o novo registro no banco de dados
      await this.registroRepository.save(novoRegistro);

      // Retorna o registro criado
      return novoRegistro;
    } catch (error) {
      console.error('Erro ao criar o registro:', error);

      // Tratamento específico para erro de duplicação
      if (error.code === '23505') {
        throw new NotAcceptableException(
          'O registro não pode ser adicionado. Verifique se as informações estão corretas ou se já existe um registro similar.',
        );
      }

      // Lança uma exceção genérica para outros erros
      throw new InternalServerErrorException(
        'Ocorreu um erro ao tentar criar o registro. Tente novamente mais tarde.',
      );
    }
  }

  async findAll() {
    try {
      // Busca todos os registros no banco de dados
      const registros = await this.registroRepository.find();

      // Verifica se há registros no resultado
      if (!registros || registros.length === 0) {
        throw new NotFoundException('Nenhum registro encontrado');
      }

      // Retorna a lista de registros
      return registros;
    } catch (error) {
      console.error('Erro ao buscar registros:', error);

      // Lança uma exceção genérica para falhas de busca
      throw new InternalServerErrorException(
        'Ocorreu um erro ao buscar os registros. Tente novamente mais tarde.',
      );
    }
  }

  async findOne(id: number) {
    try {
      // Busca o registro pelo ID fornecido
      const registroEncontrado = await this.registroRepository.findOne({
        where: { idUsuario: id },
      });

      // Lança exceção se o registro não for encontrado
      if (!registroEncontrado) {
        throw new NotFoundException(`Registro com o ID ${id} não encontrado`);
      }

      return registroEncontrado;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Relança a exceção específica se o registro não for encontrado
      } else {
        console.error('Erro ao buscar registro:', error);
        throw new InternalServerErrorException(
          'Erro ao buscar o registro no banco de dados. Tente novamente mais tarde.',
        );
      }
    }
  }

  async update(id: number, updateRegistroDto: UpdateRegistroDto) {
    try {
      // Verifica se o registro existe antes de atualizar
      const registroEncontrado = await this.findOne(id);

      // Mescla as alterações do DTO com a entidade registro encontrada
      this.registroRepository.merge(registroEncontrado, updateRegistroDto);

      try {
        // Salva as alterações no banco de dados
        return await this.registroRepository.save({
          ...registroEncontrado,
        });
      } catch (saveError) {
        console.error('Erro ao salvar o registro atualizado:', saveError);
        throw new InternalServerErrorException(
          'Erro ao salvar o registro atualizado. Tente novamente mais tarde.',
        );
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Relança a exceção se o registro não for encontrado
      } else {
        console.error('Erro ao atualizar os dados do registro:', error);
        throw new InternalServerErrorException(
          'Erro ao atualizar os dados do registro. Tente novamente mais tarde.',
        );
      }
    }
  }

  async remove(id: number) {
    try {
      // Verifica se o registro existe antes de remover
      const registroEncontrado = await this.findOne(id);

      try {
        // Remove o registro encontrado do banco de dados
        await this.registroRepository.remove(registroEncontrado);
      } catch (removeError) {
        console.error('Erro ao deletar o registro:', removeError);
        throw new InternalServerErrorException(
          'Erro ao deletar o registro. Tente novamente mais tarde.',
        );
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Relança a exceção se o registro não for encontrado
      } else {
        console.error('Erro ao buscar o registro para deleção:', error);
        throw new InternalServerErrorException(
          'Erro ao buscar o registro para deleção. Tente novamente mais tarde.',
        );
      }
    }
  }
}
