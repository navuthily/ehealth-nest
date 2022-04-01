import  DataLoader from 'dataloader';
import { getRepository } from 'typeorm';
import { DMLoiKhuyenEntity } from '../../dm-loikhuyen/dm-loikhuyen.entity';
import { DMLoaiKhamEntity } from '../dm-loaikham.entity';
import { DMModuleLoaiKhamEntity } from '../dm-module-loaikham.entity';


export function dmloaikhamToLoikhuyenLoader() {
  return new DataLoader<number, DMLoiKhuyenEntity>(async (ids) => {

    
    const loikhuyen = await getRepository(DMLoiKhuyenEntity)
    .createQueryBuilder('DM_Module_LoaiKham')
    .getMany();   


    const ressult = loikhuyen.filter((u) => ids.includes(u.autoId))

    console.log("=======================================",ressult);
    return ressult

  })
}


