import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipo_empresa', { schema: 'checkpoint' })
export class TipoEmpresa {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  // @Column('varchar', { name: 'descricao', length: 50 })
  // descricao: string;

  // @OneToMany(() => Empresa, (empresa) => empresa.tipoEmpresa)
  // empresas: Empresa[];
}
