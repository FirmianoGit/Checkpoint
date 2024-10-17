/* eslint-disable prettier/prettier */
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('fk_departamento_empresa', ['empresaId'], {})
@Entity('departamento', { schema: 'checkpoint' })
export class Departamento {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'empresa_id' })
  empresaId: number;

  @Column('varchar', { name: 'nome', length: 100 })
  nome: string;

  // @ManyToOne(() => Empresa, (empresa) => empresa.departamentos, {
  //   onDelete: "NO ACTION",
  //   onUpdate: "NO ACTION",
  // })
  // @JoinColumn([{ name: "empresa_id", referencedColumnName: "id" }])
  // empresa: Empresa;

  // @OneToMany(() => Usuario, (usuario) => usuario.departamento)
  // usuarios: Usuario[];
}
