import {
  Controller, Get, Inject, CACHE_MANAGER, UseInterceptors
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedRequest, CrudRequestInterceptor } from '@nestjsx/crud';
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
      todieutrichitiets: {
        eager: false,
      },
      'todieutrichitiets.nhanvien':{
        eager: false
      }


      
      
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

  get base(): CrudController<ToDieuTriEntity>{
    return this
  }


  @UseInterceptors(CrudRequestInterceptor)
  @Get('/abc')
  async abc(@ParsedRequest() req: CrudRequest){
    if(this.base.getManyBase){
      const data = await this.base.getManyBase(req);
      return data
    }
    
    
  }
}


//http://localhost:7000/cauhinhtoolcap2?join=cauhinhtoolcap3s&join=cauhinhtoolcap3s.dauvaocap1&join=cauhinhtoolcap3s.dauvaocap1.danhmucloaidinhnghia&filter=cauhinhtoolcap3s.SuDungC3||$eq||1