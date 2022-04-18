import {
  Controller, Get, Inject, CACHE_MANAGER, Param
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Cache } from 'cache-manager';
import { CauHinhDiemChamCap1Service } from './cauhinhchamdiemcap1.service';
import { CauHinhDiemChamCap1Entity } from './cauhinhdiemchamcap1.entity';

@Crud({
  model: {
    type: CauHinhDiemChamCap1Entity,
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
      cauhinhdiemchamcap2s: {
        eager: false
      },

      
      
    },

  }
})
@Controller('cauhinhdiemchamcap1')
@ApiTags('cauhinhdiemchamcap1')
export class CauHinhChamDiemCap1Controller implements CrudController<CauHinhDiemChamCap1Entity> {
  constructor(
    public service: CauHinhDiemChamCap1Service,
  ) {
  }


  @Get("ketquabylichsudiem/:id_tool/:id_lichsu")
  getKetQuaByIdLichSuDiem(@Param('id_tool') id_tool: number, @Param('id_lichsu') id_lichsu: number){
    return this.service.getKetQuaByIdLichSuDiem(id_tool, id_lichsu)
  }

}
