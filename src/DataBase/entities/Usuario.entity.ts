import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Departamento } from './Departamento.entity';
import { Endereco } from './Endereco.entity';
import { Registro } from './Registro.entity';

@Entity('usuario', { schema: 'checkpoint' })
export class Usuario {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'cpf', length: 11 })
  cpf: string;

  @Column('varchar', { name: 'senha', length: 150 })
  senha: string;

  @Column('varchar', { name: 'rg', length: 20 })
  rg: string;

  @Column('varchar', { name: 'email', length: 40 })
  email: string;

  @Column('varchar', { name: 'nome', length: 50 })
  nome: string;

  @Column('varchar', { name: 'telefone', length: 20 })
  telefone: string;

  @Column('varchar', { name: 'tipo_usu', length: 20, nullable: true })
  tipoUsuario: string;

  @Column('int', { name: 'departamento_id' })
  departamentoId: number;

  @OneToMany(() => Endereco, (endereco) => endereco.usuario)
  enderecos: Endereco[];

  @OneToMany(() => Registro, (registro) => registro.idUsuario)
  registros: Registro[];

  @ManyToOne(() => Departamento, (departamento) => departamento.usuarios, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'departamento_id', referencedColumnName: 'id' }])
  departamento: Departamento;
}
