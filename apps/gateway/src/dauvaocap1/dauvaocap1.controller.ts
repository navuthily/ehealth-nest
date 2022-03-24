import {
  Controller, Get, Inject, CACHE_MANAGER
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Cache } from 'cache-manager';
import { DauVaoCap1Entity } from './dauvaocap1.entity';
import { DauVaoCap1Service } from './dauvaocap1.service';

@Crud({
  model: {
    type: DauVaoCap1Entity,
  },
  query: {

    join: {
      danhmucloaidinhnghia: {
        eager: true,
      },

      dauvaocap2s:{
        eager: true
      },
      cauhinhtoolcap3s:{
        eager: true
      },
      
    },

  }
})
@Controller('dauvaocap1')
@ApiTags('dauvaocap1')
export class DauVaoCap1Controller implements CrudController<DauVaoCap1Entity> {
  constructor(
    public service: DauVaoCap1Service,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

}
