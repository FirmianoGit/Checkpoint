import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Departamento } from './Departamento.entity';
import { Endereco } from './Endereco.entity';

@Entity('empresa', { schema: 'checkpoint' })
export class Empresa {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'nome_fantasia', length: 50 })
  nomeFantasia: string;

  @Column('varchar', { name: 'razao_social', length: 50 })
  razaoSocial: string;

  @Column('varchar', { name: 'CNPJ', length: 15 })
  cnpj: string;

  @Column('varchar', { name: 'senha', length: 150 })
  senha: string;

  @Column('int', { name: 'endereco_empresa_id', nullable: true })
  enderecoEmpresaId: number | null;

  @Column('decimal', {
    name: 'longitude',
    nullable: true,
    precision: 10,
    scale: 8,
  })
  longitude: string | null;

  @Column('decimal', {
    name: 'latitude',
    nullable: true,
    precision: 10,
    scale: 8,
  })
  latitude: string | null;

  @OneToMany(() => Departamento, (departamento) => departamento.empresa)
  departamentos: Departamento[];

  @OneToMany(() => Endereco, (endereco) => endereco.empresa)
  enderecos: Endereco[];
}
