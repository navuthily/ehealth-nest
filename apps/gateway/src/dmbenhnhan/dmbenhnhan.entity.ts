import { Column, Entity, OneToMany, PrimaryColumn, ManyToOne, JoinColumn, OneToOne, AfterLoad, getRepository } from 'typeorm';


@Entity({ name: 'DM_BenhNhan' })
export class DMbenhnhanEntity {


  @PrimaryColumn({ name: 'ID_BenhNhan' })
  ID_BenhNhan: number;


  @Column({ name: 'MaBenhNhan' })
  MaBenhNhan?: number;

  @Column({ name: 'Avatar' })
  Avatar?: string;






}
