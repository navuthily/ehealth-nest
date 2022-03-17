import { Column, Entity, OneToMany, PrimaryColumn, ManyToOne, JoinColumn, OneToOne, AfterLoad, getRepository } from 'typeorm';
import { DMlanguageEntity } from '../ngonngu/ngonngu.entity';
import { DMlabelEntity } from '../dmlabel/dmlabel.entity';


@Entity({ name: 'gd2_label_language' })
export class DMlabellanguageEntity {


  @PrimaryColumn({ name: 'id' })
  public id!: number;


  @Column({ name: 'id_language' })
  public id_language!: number;


  @Column({ name: 'id_label' })
  public id_label!: number;


  @Column({ name: 'value' })
  public value!: string;

  @ManyToOne(() => DMlanguageEntity, language => language.labelToLanguages)
  @JoinColumn({ name: "id_language" })
  public language!: DMlanguageEntity

  @ManyToOne(() => DMlabelEntity, label => label.labelToLanguages)
  @JoinColumn({ name: "id_label" })
  public label!: DMlabelEntity
}
