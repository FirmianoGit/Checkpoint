import { DataSource } from 'typeorm';
import { Usuario } from 'src/DataBase/entities/Usuario.entity';
import { Empresa } from 'src/DataBase/entities/Empresa';
import { Departamento } from 'src/DataBase/entities/Departamento';
import { Endereco } from 'src/DataBase/entities/Endereco';
import { Registro } from 'src/DataBase/entities/Registro';

const createRepositoryProvider = (entity: any, token: string) => ({
  provide: token,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
  inject: ['DATA_SOURCE'],
});

export const EntityProviders = [
  createRepositoryProvider(Usuario, 'USUARIO_REPOSITORY'),
  createRepositoryProvider(Empresa, 'EMPRESA_REPOSITORY'),
  createRepositoryProvider(Departamento, 'DEPARTAMENTO_REPOSITORY'),
  createRepositoryProvider(Endereco, 'ENDERECO_REPOSITORY'),
  createRepositoryProvider(Registro, 'REGISTRO_REPOSITORY'),
];
