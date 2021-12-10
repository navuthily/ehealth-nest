import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import {DmLanguageEntity} from '../dm-language/dm-language.entity';
import { DmlabelEntity } from '../dm-label/dm-label.entity';
@Entity('gd2_label_language')
export class DmLabelLanguageEntity {
  @PrimaryColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'id_language' })
  id_language!: string;

  @Column({ name: 'id_label' })
  id_label!: string;

  @Column({ name: 'value' })
  value!: string;

  @Column({ name: 'active' })
  active?: boolean;

  @Column({ name: 'nhanvientao_id' })
  nhanvientao_id?: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'nhanvientao_id', referencedColumnName: 'nhanvienId' })
  user: UserEntity;

  @ManyToOne(() => DmLanguageEntity)
  @JoinColumn({ name: 'id_language', referencedColumnName: 'id' })
  language: DmLanguageEntity;

  @ManyToOne(() => DmlabelEntity)
  @JoinColumn({ name: 'id_label', referencedColumnName: 'id' })
  label: DmlabelEntity;
}
