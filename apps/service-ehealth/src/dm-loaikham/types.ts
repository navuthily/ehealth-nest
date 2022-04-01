import { QueryArgsType } from "@nestjs-query/query-graphql";
import { Query } from "@nestjs/common";
import { ArgsType } from "@nestjs/graphql";
import { DMLoaiKhamDTO } from "./dto/dm-loaikham.dto";

@ArgsType()


export class DmModuleloaikhamQuery extends QueryArgsType(DMLoaiKhamDTO){}

export const DmModuleloaikhamConnection = DmModuleloaikhamQuery.ConnectionType;