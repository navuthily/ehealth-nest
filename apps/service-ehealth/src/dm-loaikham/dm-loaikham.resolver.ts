
import { Resolver , Query, ResolveField, Parent, Context, ResolveReference} from "@nestjs/graphql";
import { DMLoaiKhamEntity } from "./dm-loaikham.entity";
import { DMLoaikhamService } from "./dm-loaikham.service";
import  DataLoader from 'dataloader';
import { DMLoaiKhamDTO } from "./dto/dm-loaikham.dto";
import {DmModuleloaikhamConnection} from './types'
import { ConnectionType, CRUDResolver, CursorPagingType } from "@nestjs-query/query-graphql";
import { InjectQueryService, QueryService } from "@nestjs-query/core";
import { DMModuleLoaiKhamDTO } from "./dto/dm-module-loaikham.dto";
import { QueryType } from "@nestjs-query/query-graphql/dist/src/types/query";
import { ExecutionContext } from "@nestjs/common";
import { DMLoiKhuyenEntity } from "../dm-loikhuyen/dm-loikhuyen.entity";

@Resolver(of => DMLoaiKhamEntity)
export class DMLoaikhamResolver{
    constructor(
      readonly  dmloaikhamService:DMLoaikhamService
    ){
      
    }

    

    @Query(() => [DMLoaiKhamEntity],{nullable:true})
    async findAll(): Promise<DMLoaiKhamEntity[]>{
      const data = await this.dmloaikhamService.getAll()
      return data
    }

   @ResolveField()
    async dmModuleLoaiKhams(@Parent() dmloaikham:  DMLoaiKhamEntity, @Context('dmloaikhamToModuleLoader') dmloaikhamToModuleLoader: DataLoader<number, DMLoaiKhamEntity>) {
        const { ID_LoaiKham } = dmloaikham
        // console.log(ID_LoaiKham)
        if(ID_LoaiKham){
          return dmloaikhamToModuleLoader.load(ID_LoaiKham)
        }

        
    }

    @ResolveField()
    async dmLoiKhuyen(@Parent() dmloaikham:  DMLoaiKhamEntity, @Context('dmloaikhamToLoikhuyenLoader') dmloaikhamToLoikhuyenLoader: DataLoader<number, DMLoiKhuyenEntity>){

        const { LoiKhuyen_App } = dmloaikham
        if(LoiKhuyen_App) return dmloaikhamToLoikhuyenLoader.load(LoiKhuyen_App);  
    }




    //  @ResolveField()
    //   async dmModuleLoaiKhams(@Parent() dmloaikham:  DMLoaiKhamDTO  & { dmModuleLoaiKhams?: ConnectionType<DMModuleLoaiKhamDTO> }, @Context('dmloaikhamToModuleLoader') dmloaikhamToModuleLoader: DataLoader<number, DMLoaiKhamEntity>) :Promise<null>{
    // @ResolveField()
    // async dmModuleLoaiKhams(@Parent() dmloaikham:  DMLoaiKhamDTO  & { dmModuleLoaiKhams?: ConnectionType<DMModuleLoaiKhamDTO> }, query: QueryType<DMModuleLoaiKhamDTO, CursorPagingType>, ctx: ExecutionContext) :Promise<null>{
    //     const { ID_LoaiKham } = dmloaikham
    //     // console.log(ID_LoaiKham)
    //     if(ID_LoaiKham){
    //       // return dmloaikhamToModuleLoader.load(ID_LoaiKham)
    //     }
    //     // console.log(dmloaikham);
    //     return null
        
    // }
}