// import {
//   InjectQueryService,
//   QueryService,
//   RelationQueryService,
// } from '@nestjs-query/core';
// import { SuatAnReferenceDTO } from './dto/suatan-reference.dto';
// import { ThongTinLuotKhamEntity } from './thongtinluotkham.entity';

// @QueryService(SuatAnReferenceDTO)
// export class SuatAnService extends RelationQueryService<SuatAnReferenceDTO> {
//   constructor(
//     @InjectQueryService(ThongTinLuotKhamEntity)
//     readonly suatanService: QueryService<ThongTinLuotKhamEntity>,
//   ) {
//     super({
//       // the name of the relation
//       thongtinluotkham: {
//         // the service to delegate to when looking up the relations
//         service: suatanService,
//         // a query factory that will take in the reference to create a query.
//         query: (suatanReferenceDTO) => ({
//           filter: {
//             luotkhamId: { eq: suatanReferenceDTO.luotkhamId },
//           },
//         }),
//       },
//     });
//   }
// }
