import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'DonVi' })
export class DmdonviEntity  {


  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'ten_don_vi' })
  tendonvi?: string;
  
  @Column({nullable:true, name: 'created_at' })
  createdAt?: Date;
  
  @Column({ nullable:true,name: 'updated_at' })
  updatedAt?: Date;

  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nguoitaodonvi)
  @JoinColumn({ name: 'created_by' })
  nguoitao: UserEntity;

  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nguoisuadonvi)
  @JoinColumn({ name: 'updated_by' })
  nguoisua: UserEntity;

  @OneToMany(() => UserEntity, nhanvien => nhanvien.dmdonvi)
  nhanviens: UserEntity[]

}
