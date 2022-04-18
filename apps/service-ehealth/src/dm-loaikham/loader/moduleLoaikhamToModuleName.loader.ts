import  DataLoader from 'dataloader';
import { getRepository } from 'typeorm';
import { DMLoiKhuyenEntity } from '../../dm-loikhuyen/dm-loikhuyen.entity';
import { DMLoaiKhamEntity } from '../dm-loaikham.entity';
import { DMLoaikhamService } from '../dm-loaikham.service';
import { DMModuleLoaiKhamEntity } from '../dm-module-loaikham.entity';


export function moduleLoaiKhamToModuleNameLoader(service: DMLoaikhamService) {
  return new DataLoader(async (ids) => {
      const data = await service.getModuleName()
      const mapResult =  ids.map((id) => data.find((item) => item.id == id).module_name)
      return mapResult
  })
}


