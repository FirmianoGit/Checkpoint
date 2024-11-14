import { DataSource } from 'typeorm';
import { Empresa } from './entities/Empresa.entity';
import { Departamento } from './entities/Departamento.entity';
import { Endereco } from './entities/Endereco.entity';
import { Registro } from './entities/Registro.entity';

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
      });

      return dataSource.initialize();
    },
  },
];
