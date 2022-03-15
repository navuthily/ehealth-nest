import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'GD2_CauHinhDiemThiAnhVan' })
export class DiemthianhvanEntity  {


  @PrimaryColumn({ name: 'ID_Auto' })
  id: number;

  @Column({ name: 'ID_NhanVien' })
  idnhanvien: number;
  
  @Column({ name: 'ID_NhomAnhVan' })
  idloaihopdong: number;
  
  @ManyToOne(() => UserEntity, nhanvien => nhanvien.dienthianhvans)
  @JoinColumn({ name: "ID_NhanVien" })
  nhanvien:UserEntity
}
