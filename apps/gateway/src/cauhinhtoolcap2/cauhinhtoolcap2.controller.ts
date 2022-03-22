import {
  Controller, Get, Inject, CACHE_MANAGER
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { CauHinhToolCap2Service } from './cauhinhtoolcap2.service';
import { Cache } from 'cache-manager';
import { CauHinhToolCap2Entity } from './cauhinhtoolcap2.entity';

@Crud({
  model: {
    type: CauHinhToolCap2Entity,
  },
  query: {
    join: {
      cauhinhtoolcap1: {
        eager: false
      }
      
      
    },

  }
})
@Controller('cauhinhtoolcap2')
@ApiTags('cauhinhtoolcap2')
export class CauHinhToolCap2Controller implements CrudController<CauHinhToolCap2Entity> {
  constructor(
    public service: CauHinhToolCap2Service,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {






  }

}
