import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './Usuario.entity';

@Entity('registro', { schema: 'checkpoint' })
export class Registro {
  @PrimaryGeneratedColumn('increment')
  id: number; // Novo campo de ID auto-incrementável

  @Column('int', { name: 'id_usuario' })
  idUsuario: number;

  @Column('timestamp', {
    name: 'data_registro',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dataRegistro: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.registros, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_usuario', referencedColumnName: 'id' }])
  usuario: Usuario; // Relacionamento com o campo Usuario
}
