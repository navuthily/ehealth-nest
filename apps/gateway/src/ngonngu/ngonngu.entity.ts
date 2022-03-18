import { Column, Entity, OneToMany, PrimaryColumn, ManyToOne, JoinColumn, OneToOne, AfterLoad, getRepository } from 'typeorm';
import { DMlabellanguageEntity } from '../dmlabellanguage/dmlabellanguage.entity';


@Entity({ name: 'gd2_dm_language' })
export class DMlanguageEntity {


  @PrimaryColumn({ name: 'id' })
  id: number;


  @Column({ name: 'name' })
  name?: number;

  @Column({ name: 'code' })
  code?: string;


  @OneToMany(() => DMlabellanguageEntity, labelToLanguage => labelToLanguage.language)
  public labelToLanguages!: DMlabellanguageEntity[]



}
