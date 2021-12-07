import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ThongTinBenhVienEntity } from '../thongtinbenhvien/thongtinbenhvien.entity';
import { UserEntity } from '../user/user.entity';

@Entity('gd2_dm_label')
export class DmlabelEntity {
  @PrimaryColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'keyname' })
  keyname!: string;

  @Column({ name: 'notes' })
  notes!: string;

  @Column({ name: 'active' })
  active?: boolean;

  @Column({ name: 'nhanvientao_id' })
  nhanvientao_id?: number;

  @Column({ name: 'Id_BenhVien' })
  Id_BenhVien?: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'nhanvientao_id', referencedColumnName: 'nhanvienId' })
  user: UserEntity;

  @ManyToOne(() => ThongTinBenhVienEntity)
  @JoinColumn({ name: 'Id_BenhVien', referencedColumnName: 'Id_BenhVien' })
  thongtinbenhvien: ThongTinBenhVienEntity;

}
