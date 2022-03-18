import { Column, Entity, OneToMany, PrimaryColumn, ManyToOne, JoinColumn, OneToOne, AfterLoad, getRepository } from 'typeorm';
import { DMlabellanguageEntity } from '../dmlabellanguage/dmlabellanguage.entity';


@Entity({ name: 'gd2_dm_label' })
export class DMlabelEntity {


  @PrimaryColumn({ name: 'id' })
  id: number;


  @Column({ name: 'keyname' })
  keyname?: string;


  @OneToMany(() => DMlabellanguageEntity, labelToLanguage => labelToLanguage.label)
  public labelToLanguages!: DMlabellanguageEntity[]




}
