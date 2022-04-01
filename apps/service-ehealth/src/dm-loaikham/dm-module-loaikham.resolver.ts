
import { Resolver , Query, ResolveField, Parent, ResolveReference, Context} from "@nestjs/graphql";
import DataLoader from "dataloader";
import { DMLoaiKhamEntity } from "./dm-loaikham.entity";
import { DMModuleLoaiKhamEntity } from "./dm-module-loaikham.entity";

@Resolver(of => DMModuleLoaiKhamEntity)
export class DMModuleLoaikhamResolver{
    constructor(
      // readonly  dmloaikhamService: DMLoaikhamService
    ){
      console.log("------------------------------------------------------------------------");
      
    }

    

    // @Query(() => [DMLoaiKhamEntity],{nullable:true})
    // async findAll(): Promise<DMLoaiKhamEntity[]>{
    //   const data = await this.dmloaikhamService.getAll()
    //   return data
    // }

    @ResolveField()
    dmmodule(@Parent() dmModuleLoaikham:  DMModuleLoaiKhamEntity, @Context('moduleLoaiKhamToModuleNameLoader') moduleLoaiKhamToModuleNameLoader: DataLoader<number, DMModuleLoaiKhamEntity>) {
      const { moduleId } = dmModuleLoaikham
      if(moduleId) return moduleLoaiKhamToModuleNameLoader.load(moduleId)
        
    }
    




}