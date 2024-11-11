import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEnderecoDto } from '../common/dto/endereco/create-endereco.dto';
import { UpdateEnderecoDto } from '../common/dto/endereco/update-endereco.dto';
import { Repository } from 'typeorm';
import { Endereco } from 'src/DataBase/entities/Endereco.entity';

@Injectable()
export class EnderecoService {
  constructor(
    @Inject('ENDERECO_REPOSITORY')
    private readonly enderecoRepository: Repository<Endereco>, // Injeção de dependência para o repositório da entidade Endereco
  ) {}
  async create(createEnderecoDto: CreateEnderecoDto) {
    try {
      // Cria uma nova instância de Empresa com os dados do DTO
      const novoEndereco: Endereco =
        this.enderecoRepository.create(createEnderecoDto);

      // Salva a nova empresa no banco de dados
      await this.enderecoRepository.save(novoEndereco);

      // Retorna a empresa criada
      return novoEndereco;
    } catch (error) {
      console.error('Erro ao criar a empresa:', error);

      // Tratamento específico para erro de duplicação
      if (error.code === '23505') {
        throw new NotAcceptableException(
          'O endereço não pode ser adicionado, verifique se as informações estão corretas ou se já existe.',
        );
      }

      // Lança uma exceção genérica para outros erros
      throw new InternalServerErrorException(
        'Ocorreu um erro ao tentar criar o endereço. Tente novamente mais tarde.',
      );
    }
  }

  async findAll() {
    try {
      // Busca todas as empresas no banco de dados
      const Enderecos = await this.enderecoRepository.find();

      // Verifica se há empresas no resultado
      if (!Enderecos || Enderecos.length === 0) {
        throw new NotFoundException('Nenhuma empresa encontrada');
      }

      // Retorna a lista de empresas
      return Enderecos;
    } catch (error) {
      console.error('Erro ao buscar endereços:', error);

      // Lança uma exceção genérica para falhas de busca
      throw new InternalServerErrorException(
        'Ocorreu um erro ao buscar os endereços. Tente novamente mais tarde.',
      );
    }
  }

  async findOne(id: number) {
    try {
      // Busca a empresa pelo ID fornecido
      const EnderecoEncontrado = await this.enderecoRepository.findOne({
        where: { id },
      });

      // Lança exceção se a empresa não for encontrada
      if (!EnderecoEncontrado) {
        throw new NotFoundException(`Endereço com o ID ${id} não encontrada`);
      }

      return EnderecoEncontrado;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Relança a exceção específica se a empresa não for encontrada
      } else {
        console.error('Erro ao buscar empresa:', error);
        throw new InternalServerErrorException(
          'Erro ao buscar o endereço no banco de dados. Tente novamente mais tarde.',
        );
      }
    }
  }

  async update(id: number, updateEnderecoDto: UpdateEnderecoDto) {
    try {
      // Verifica se a empresa existe antes de atualizar
      const EnderecoEncontrado = await this.findOne(id);

      // Mescla as alterações do DTO com a entidade empresa encontrada
      this.enderecoRepository.merge(EnderecoEncontrado, updateEnderecoDto);

      try {
        // Salva as alterações no banco de dados
        return await this.enderecoRepository.save({
          ...EnderecoEncontrado,
        });
      } catch (saveError) {
        console.error('Erro ao salvar a empresa atualizada:', saveError);
        throw new InternalServerErrorException(
          'Erro ao salvar a empresa atualizada. Tente novamente mais tarde.',
        );
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Relança a exceção se a empresa não for encontrada
      } else {
        console.error('Erro ao atualizar os dados da empresa:', error);
        throw new InternalServerErrorException(
          'Erro ao atualizar os dados da empresa. Tente novamente mais tarde.',
        );
      }
    }
  }

  // Método para remover uma empresa pelo ID

  async remove(id: number) {
    try {
      // Verifica se a empresa existe antes de remover
      const EnderecoEncontrado = await this.findOne(id);

      try {
        // Remove a empresa encontrada do banco de dados
        await this.enderecoRepository.remove(EnderecoEncontrado);
      } catch (removeError) {
        console.error('Erro ao deletar o registro da empresa:', removeError);
        throw new InternalServerErrorException(
          'Erro ao deletar o registro da empresa. Tente novamente mais tarde.',
        );
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Relança a exceção se a empresa não for encontrada
      } else {
        console.error('Erro ao buscar a empresa para deleção:', error);
        throw new InternalServerErrorException(
          'Erro ao buscar a empresa para deleção. Tente novamente mais tarde.',
        );
      }
    }
  }
}
