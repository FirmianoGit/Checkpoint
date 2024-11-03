import { DataSource } from 'typeorm';
import { Empresa } from './entities/Empresa';
import { Departamento } from './entities/Departamento';
import { Endereco } from './entities/Endereco';
import { Registro } from './entities/Registro';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'db',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'checkpoint',
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
          Empresa,
          Departamento,
          Endereco,
          Registro,
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
