import { Column, Entity } from 'typeorm';

@Entity('registro', { schema: 'checkpoint' })
export class Registro {
  @Column('int', { primary: true, name: 'id_usuario' })
  idUsuario: number;

  @Column('timestamp', {
    primary: true,
    name: 'Data_registro',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dataRegistro: Date;

  // @ManyToOne(() => Usuario, (usuario) => usuario.registros, {
  //   onDelete: 'NO ACTION',
  //   onUpdate: 'NO ACTION',
  // })
  // @JoinColumn([{ name: 'id_usuario', referencedColumnName: 'id' }])
  // idUsuario2: Usuario;

  // @ManyToOne(() => Usuario, (usuario) => usuario.registros2, {
  //   onDelete: 'NO ACTION',
  //   onUpdate: 'NO ACTION',
  // })
  // @JoinColumn([{ name: 'id_usuario', referencedColumnName: 'id' }])
  // idUsuario3: Usuario;
}
