import { DataSource } from 'typeorm';
import { Usuario } from 'src/DataBase/entities/Usuario.entity';

export const usuarioProviders = [
  {
    provide: 'USUARIO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Usuario),
    inject: ['DATA_SOURCE'],
  },
];
