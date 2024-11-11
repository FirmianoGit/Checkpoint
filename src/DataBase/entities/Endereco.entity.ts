import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Empresa } from './Empresa.entity';
import { Usuario } from './Usuario.entity';

@Index('fk_endereco_empresa', ['empresaId'], {})
@Index('fk_endereco_usuario', ['usuarioId'], {})
@Entity('endereco', { schema: 'checkpoint' })
export class Endereco {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'empresa_id', nullable: true })
  empresaId: number | null;

  @Column('int', { name: 'usuario_id', nullable: true })
  usuarioId: number | null;

  @Column('varchar', { name: 'logradouro', length: 255 })
  logradouro: string;

  @Column('varchar', { name: 'numero', length: 20 })
  numero: string;

  @Column('varchar', { name: 'complemento', nullable: true, length: 100 })
  complemento: string | null;

  @Column('varchar', { name: 'bairro', length: 100 })
  bairro: string;

  @Column('varchar', { name: 'cidade', length: 100 })
  cidade: string;

  @Column('varchar', { name: 'estado', length: 2 })
  estado: string;

  @Column('varchar', { name: 'cep', length: 8 })
  cep: string;

  @Column('varchar', { name: 'pais', length: 100, default: () => "'Brasil'" })
  pais: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.enderecos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'empresa_id', referencedColumnName: 'id' }])
  empresa: Empresa;

  @ManyToOne(() => Usuario, (usuario) => usuario.enderecos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'usuario_id', referencedColumnName: 'id' }])
  usuario: Usuario;
}
