import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { LoaibangcapService } from './loaibangcap.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { LoaibangcapEntity } from './loaibangcap.entity';

@Crud({
  model: {
    type: LoaibangcapEntity,
  }
})
@Controller('loaibangcap')
@ApiTags('loaibangcap')
export class LoaibangcapController implements CrudController<LoaibangcapEntity> {
  constructor(
    public service: LoaibangcapService
  ) {
  }
}
