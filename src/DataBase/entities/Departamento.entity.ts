import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Empresa } from './Empresa.entity';
import { Usuario } from './Usuario.entity';

@Entity('departamento', { schema: 'checkpoint' })
export class Departamento {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'empresa_id' })
  empresaId: number;

  @Column('varchar', { name: 'nome', length: 100 })
  nome: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.departamentos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'empresa_id', referencedColumnName: 'id' }])
  empresa: Empresa;

  @OneToMany(() => Usuario, (usuario) => usuario.departamento)
  usuarios: Usuario[];
}
