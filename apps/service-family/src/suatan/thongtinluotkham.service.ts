// import {
//   InjectQueryService,
//   QueryService,
//   RelationQueryService,
// } from '@nestjs-query/core';
// import { ThongTinLuotKhamReferenceDTO } from './dto/thongtinluotkham-reference.dto';
// import { SuatAnEntity } from './suatan.entity';

// @QueryService(ThongTinLuotKhamReferenceDTO)
// export class Posph66EHService extends RelationQueryService<ThongTinLuotKhamReferenceDTO> {
//   constructor(
//     @InjectQueryService(SuatAnEntity)
//     readonly subTaskService: QueryService<SuatAnEntity>,
//   ) {
//     super({
//       // the name of the relation
//       suanans: {
//         // the service to delegate to when looking up the relations
//         service: subTaskService,
//         // a query factory that will take in the reference to create a query.
//         query: (thongTinLuotKhamReferenceDTO) => ({
//           filter: {
//             benhnhanId: { eq: thongTinLuotKhamReferenceDTO.luotkhamId },
//           },
//         }),
//       },
//     });
//   }
// }
