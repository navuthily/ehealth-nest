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

    filter:[
        {
          field: "SuDung",
          operator: "$eq",
          value: "1"
        }
        
      ],
    join: {
      cauhinhtoolcap1: {
        eager: false,
      },
      cauhinhtoolcap3s:{
        eager: false,
        
      },
      'cauhinhtoolcap3s.dauvaocap1':{
        alias: "c2d1",
        eager: false,
      },
      'cauhinhtoolcap3s.dauvaocap1.danhmucloaidinhnghia':{
        eager: false,
      },

      
      
    },

  }
})
@Controller('cauhinhtoolcap2')
@ApiTags('cauhinhtoolcap2')
export class CauHinhToolCap2Controller implements CrudController<CauHinhToolCap2Entity> {
  constructor(
    public service: CauHinhToolCap2Service,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

}


//http://localhost:7000/cauhinhtoolcap2?join=cauhinhtoolcap3s&join=cauhinhtoolcap3s.dauvaocap1&join=cauhinhtoolcap3s.dauvaocap1.danhmucloaidinhnghia&filter=cauhinhtoolcap3s.SuDungC3||$eq||1