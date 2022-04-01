import  DataLoader from 'dataloader';
import { getRepository } from 'typeorm';
import { DMLoaiKhamEntity } from '../dm-loaikham.entity';
import { DMModuleLoaiKhamEntity } from '../dm-module-loaikham.entity';


export function dmloaikhamToModuleLoader() {

  // let result: DMLoaiKhamEntity[] = [];

  return new DataLoader(async (ids: number[]) => {
      const data = await getDataLuotkham()

      const mapResult =  ids.map((id) => data.filter((item) => item.loaikhamId == id))

      
      return mapResult

  })
}

 const getDataLuotkham = async() => {
  // return   getRepository(DMLoaiKhamEntity)
  // .createQueryBuilder('DM_LoaiKham')
  // .leftJoinAndSelect('DM_LoaiKham.dmModuleLoaiKhams', 'DM_Module_LoaiKham')
  // .getMany();       
  return   getRepository(DMModuleLoaiKhamEntity)
  .createQueryBuilder('DM_Module_LoaiKham')
  .getMany();  
}
