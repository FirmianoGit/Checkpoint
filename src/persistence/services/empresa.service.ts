import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Empresa } from 'src/DataBase/entities/Empresa.entity';
import { Repository } from 'typeorm';
import { CreateEmpresaDto } from '../common/dto/empresa/create-empresa.dto';
import { UpdateEmpresaDto } from '../common/dto/empresa/update-empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(
    @Inject('EMPRESA_REPOSITORY')
    private readonly empresaRepository: Repository<Empresa>, // Injeção de dependência para o repositório da entidade Empresa
  ) {}

  // Método para criar uma nova empresa
  async create(createEmpresaDto: CreateEmpresaDto): Promise<Empresa> {
    try {
      // Cria uma nova instância de Empresa com os dados do DTO
      const novaEmpresa: Empresa =
        this.empresaRepository.create(createEmpresaDto);

      // Salva a nova empresa no banco de dados
      await this.empresaRepository.save(novaEmpresa);

      // Retorna a empresa criada
      return novaEmpresa;
    } catch (error) {
      console.error('Erro ao criar a empresa:', error);

      // Tratamento específico para erro de duplicação
      if (error.code === '23505') {
        throw new NotAcceptableException(
          'A empresa não pode ser criada, verifique se as informações estão corretas ou se já existe.',
        );
      }

      // Lança uma exceção genérica para outros erros
      throw new InternalServerErrorException(
        'Ocorreu um erro ao tentar criar a empresa. Tente novamente mais tarde.',
      );
    }
  }

  // Método para buscar todas as empresas
  async findAll(): Promise<Empresa[]> {
    try {
      // Busca todas as empresas no banco de dados
      const empresas = await this.empresaRepository.find();

      // Verifica se há empresas no resultado
      if (!empresas || empresas.length === 0) {
        throw new NotFoundException('Nenhuma empresa encontrada');
      }

      // Retorna a lista de empresas
      return empresas;
    } catch (error) {
      console.error('Erro ao buscar empresas:', error);

      // Lança uma exceção genérica para falhas de busca
      throw new InternalServerErrorException(
        'Ocorreu um erro ao buscar as empresas. Tente novamente mais tarde.',
      );
    }
  }

  // Método para buscar uma empresa por ID
  async findOne(id: number): Promise<Empresa> {
    try {
      // Busca a empresa pelo ID fornecido
      const empresaEncontrada = await this.empresaRepository.findOne({
        where: { id },
      });

      // Lança exceção se a empresa não for encontrada
      if (!empresaEncontrada) {
        throw new NotFoundException(`Empresa com o ID ${id} não encontrada`);
      }

      return empresaEncontrada;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Relança a exceção específica se a empresa não for encontrada
      } else {
        console.error('Erro ao buscar empresa:', error);
        throw new InternalServerErrorException(
          'Erro ao buscar a empresa no banco de dados. Tente novamente mais tarde.',
        );
      }
    }
  }

  // Método para atualizar uma empresa pelo ID
  async update(
    id: number,
    updateEmpresaDto: UpdateEmpresaDto,
  ): Promise<Empresa> {
    try {
      // Verifica se a empresa existe antes de atualizar
      const empresaEncontrada = await this.findOne(id);

      // Mescla as alterações do DTO com a entidade empresa encontrada
      this.empresaRepository.merge(empresaEncontrada, updateEmpresaDto);

      try {
        // Salva as alterações no banco de dados
        return await this.empresaRepository.save({
          ...empresaEncontrada,
          senha: undefined, // Omite campos sensíveis, se houver
          cnpj: undefined,
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
  async remove(id: number): Promise<void> {
    try {
      // Verifica se a empresa existe antes de remover
      const empresaEncontrada = await this.findOne(id);

      try {
        // Remove a empresa encontrada do banco de dados
        await this.empresaRepository.remove(empresaEncontrada);
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
