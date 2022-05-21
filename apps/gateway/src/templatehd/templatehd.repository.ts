import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { TemplateHdEntity } from './templatehd.entity';


@EntityRepository(TemplateHdEntity)
export class TemplateHdRepository extends Repository<TemplateHdEntity> {}
