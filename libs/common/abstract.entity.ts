import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  PrimaryGeneratedColumn,

} from 'typeorm';
import type { Constructor } from '../types';
import type { AbstractDto } from './dto/abstract.dto';

export abstract class AbstractEntity<
  DTO extends AbstractDto = AbstractDto,
  O = never,
> {
  @PrimaryGeneratedColumn({ name: 'ID_NhanVien' })
  id: number;

  @Column({ nullable: true, type: 'datetime2' })
  createdAt: Date;

  @Column({ nullable: true, type: 'datetime2' })
  updatedAt: Date;

  @BeforeInsert()
  beforeInsert(): void {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    // this.id = uuid();
  }

  @BeforeUpdate()
  beforeUpdate(): void {
    this.updatedAt = new Date();
  }

  private dtoClass: Constructor<DTO, [AbstractEntity, O?]>;

  toDto(options?: O): DTO {
    const dtoClass = this.dtoClass;

    if (!dtoClass) {
      throw new Error(
        `You need to use @UseDto on class (${this.constructor.name}) be able to call toDto function`,
      );
    }

    return new this.dtoClass(this, options);
  }
}
