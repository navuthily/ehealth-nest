import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('module')
export class ModuleThanhVienEntity {
  @PrimaryColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'module_name' })
  moduleName?: string;

  @Column({ name: 'nhom_id' })
  nhomId?: number;
}
