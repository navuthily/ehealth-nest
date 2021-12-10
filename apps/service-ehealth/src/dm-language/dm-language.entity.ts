import { Column, Entity, PrimaryColumn,ManyToOne,JoinColumn  } from 'typeorm';
import { UserEntity } from '../user/user.entity';
@Entity('gd2_dm_language')
export class DmLanguageEntity {
  @PrimaryColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'name' })
  name!: string;

  @Column({ name: 'code' })
  code!: string;

  @Column({ name: 'icon' })
  icon!: string;

  @Column({ name: 'active' })
  active?: boolean;

  @Column({ name: 'nhanvientao_id' })
  nhanvientao_id?: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'nhanvientao_id', referencedColumnName: 'nhanvienId' })
  user: UserEntity;
}
