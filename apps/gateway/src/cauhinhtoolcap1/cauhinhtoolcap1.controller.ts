import {
  Controller, Get, Inject, CACHE_MANAGER
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { CauHinhToolCap1Service } from './cauhinhtoolcap1.service';
import { Cache } from 'cache-manager';
import { CauHinhToolCap1Entity } from './cauhinhtoolcap1.entity';

@Crud({
  model: {
    type: CauHinhToolCap1Entity,
  },
  query: {
    join: {
      cauhinhtoolcap2s: {
        eager: false
      },
      "cauhinhtoolcap2s.cauhinhtoolcap3s": {
        eager: false
      }
      
      
    },

  }
})
@Controller('cauhinhtoolcap1')
@ApiTags('cauhinhtoolcap1')
export class CauHinhToolCap1Controller implements CrudController<CauHinhToolCap1Entity> {
  constructor(
    public service: CauHinhToolCap1Service,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {






  }

}
