import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDepartamentoDto } from 'src/persistence/common/dto/Departamento/create-departamento.dto';
import { UpdateDepartamentoDto } from 'src/persistence/common/dto/Departamento/update-departamento.dto';
import { Repository } from 'typeorm';
import { Departamento } from 'src/DataBase/entities/Departamento.entity';

@Injectable()
export class DepartamentoService {
  // Injetando o repositório do departamento com o uso de 'DEPARTAMENTO_REPOSITORY'
  constructor(
    @Inject('DEPARTAMENTO_REPOSITORY')
    private readonly departamentoRepository: Repository<Departamento>,
  ) {}

  // Método para criar um novo departamento
  async create(createDepartamentoDto: CreateDepartamentoDto) {
    try {
      // Cria uma nova instância de departamento com dados do DTO
      const novoDepartamento: Departamento = this.departamentoRepository.create(
        createDepartamentoDto,
      );

      // Salva o novo departamento no banco de dados
      await this.departamentoRepository.save(novoDepartamento);

      // Retorna o departamento criado
      return novoDepartamento;
    } catch (error) {
      console.error('Erro ao criar o departamento:', error);

      throw new NotAcceptableException(
        `O departamento não pode ser criado. Verifique as informações.`,
      );
    }
  }

  // Método para buscar todos os departamentos
  async findAll(): Promise<Departamento[]> {
    try {
      const departamentos = await this.departamentoRepository.find();

      if (!departamentos || departamentos.length === 0) {
        throw new NotFoundException('Nenhum departamento encontrado');
      }

      return departamentos;
    } catch (error) {
      console.error('Erro ao buscar departamentos:', error);
      throw new InternalServerErrorException(
        'Erro ao buscar os departamentos. Tente novamente mais tarde.',
      );
    }
  }

  // Método para buscar um departamento pelo ID
  async findOne(id: number): Promise<Departamento> {
    try {
      const departamentoEncontrado = await this.departamentoRepository.findOne({
        where: { id },
      });

      if (!departamentoEncontrado) {
        throw new NotFoundException(
          `Departamento com o ID ${id} não encontrado`,
        );
      }

      return departamentoEncontrado;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        console.error('Erro ao buscar o departamento:', error);
        throw new InternalServerErrorException(
          'Erro ao buscar o departamento. Tente novamente mais tarde.',
        );
      }
    }
  }

  // Método para atualizar um departamento existente
  async update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
    try {
      const departamentoEncontrado = await this.findOne(id);

      if (!departamentoEncontrado) {
        throw new NotFoundException(
          `Departamento com o ID ${id} não encontrado`,
        );
      }

      // Mescla as alterações do DTO com o departamento encontrado
      this.departamentoRepository.merge(
        departamentoEncontrado,
        updateDepartamentoDto,
      );

      try {
        // Salva as alterações no banco de dados
        return await this.departamentoRepository.save(departamentoEncontrado);
      } catch (saveError) {
        console.error('Erro ao salvar o departamento atualizado:', saveError);
        throw new InternalServerErrorException(
          'Erro ao salvar o departamento atualizado. Tente novamente mais tarde.',
        );
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        console.error('Erro ao atualizar o departamento:', error);
        throw new InternalServerErrorException(
          'Erro ao atualizar o departamento. Tente novamente mais tarde.',
        );
      }
    }
  }

  // Método para remover um departamento pelo ID
  async remove(id: number) {
    try {
      const departamentoEncontrado = await this.findOne(id);

      if (!departamentoEncontrado) {
        throw new NotFoundException(
          `Departamento com o ID ${id} não encontrado`,
        );
      }

      try {
        await this.departamentoRepository.remove(departamentoEncontrado);
      } catch (removeError) {
        console.error('Erro ao deletar o departamento:', removeError);
        throw new InternalServerErrorException(
          'Erro ao deletar o departamento. Tente novamente mais tarde.',
        );
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        console.error('Erro ao buscar o departamento para deleção:', error);
        throw new InternalServerErrorException(
          'Erro ao buscar o departamento para deleção. Tente novamente mais tarde.',
        );
      }
    }
  }
}
