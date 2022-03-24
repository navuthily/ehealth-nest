import {
  Controller, Get, Inject, CACHE_MANAGER
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Cache } from 'cache-manager';
import { ToDieuTriEntity } from './todieutri.entity';
import { ToDieuTriService } from './todieutri.service';

@Crud({
  model: {
    type: ToDieuTriEntity,
  },
  query: {

    // filter:[
    //     {
    //       field: "SuDung",
    //       operator: "$eq",
    //       value: "1"
    //     }
        
    //   ],
    join: {
      // cauhinhtoolcap1: {
      //   eager: false,
      // },


      
      
    },

  }
})
@Controller('todieutri')
@ApiTags('todieutri')
export class ToDieuTriController implements CrudController<ToDieuTriEntity> {
  constructor(
    public service: ToDieuTriService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

}


//http://localhost:7000/cauhinhtoolcap2?join=cauhinhtoolcap3s&join=cauhinhtoolcap3s.dauvaocap1&join=cauhinhtoolcap3s.dauvaocap1.danhmucloaidinhnghia&filter=cauhinhtoolcap3s.SuDungC3||$eq||1