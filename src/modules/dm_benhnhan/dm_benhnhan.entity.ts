// import { Content } from 'src/modules/contents/entities/content.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DM_BenhNhan')
export class DMBenhNhan {
  @PrimaryGeneratedColumn({ name: 'ID_BenhNhan' })
  id: number;

  @Column({ name: 'MaBenhNhan' })
  maBenhNhan: string;

  @Column({ name: 'HoLotBenhNhan' })
  hoLotBenhNhan: string;

  @Column({ name: 'TenBenhNhan' })
  tenBenhNhan: string;
}
