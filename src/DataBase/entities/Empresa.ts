import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('fk_empresa_tipo_empresa', ['tipoEmpresaId'], {})
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

  @Column('int', { name: 'tipo_empresa_id' })
  tipoEmpresaId: number;

  @Column('int', { name: 'endereco_empresa_id', nullable: true })
  enderecoEmpresaId: number | null;

  @Column('point', { name: 'local_registro' })
  localRegistro: string;

  // @OneToMany(() => Departamento, (departamento) => departamento.empresa)
  // departamentos: Departamento[];

  // @ManyToOne(() => TipoEmpresa, (tipoEmpresa) => tipoEmpresa.empresas, {
  //   onDelete: 'NO ACTION',
  //   onUpdate: 'NO ACTION',
  // })
  // @JoinColumn([{ name: 'tipo_empresa_id', referencedColumnName: 'id' }])
  // tipoEmpresa: TipoEmpresa;

  // @OneToMany(() => Endereco, (endereco) => endereco.empresa)
  // enderecos: Endereco[];
}
