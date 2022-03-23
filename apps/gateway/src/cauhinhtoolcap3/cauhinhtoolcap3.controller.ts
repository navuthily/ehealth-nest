import {
  Controller, Get, Inject, CACHE_MANAGER
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { CauHinhToolCap3Service } from './cauhinhtoolcap3.service';
import { Cache } from 'cache-manager';
import { CauHinhToolCap3Entity } from './cauhinhtoolcap3.entity';

@Crud({
  model: {
    type: CauHinhToolCap3Entity,
  },
  query: {
 
    join: {
      cauhinhtoolcap2: {
        eager: false
      },
      dauvaocap1: {
        eager: true
      }

      
      
    },

  }
})
@Controller('cauhinhtoolcap3')
@ApiTags('cauhinhtoolcap3')
export class CauHinhToolCap3Controller implements CrudController<CauHinhToolCap3Entity> {
  constructor(
    public service: CauHinhToolCap3Service,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {






  }

}
