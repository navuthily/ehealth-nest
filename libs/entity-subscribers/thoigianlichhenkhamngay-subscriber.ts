import type {
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { EventSubscriber } from 'typeorm';

import { ThoigianlichhenkhamngayEntity } from '../../apps/gateway/src/gd2_thoigianlichhenkhamngay/thoigianlichhenkhamngay.entity'


@EventSubscriber()
export class TGLHKNSubscriber implements EntitySubscriberInterface<ThoigianlichhenkhamngayEntity> {
  listenTo(): typeof ThoigianlichhenkhamngayEntity {
    return ThoigianlichhenkhamngayEntity;
  }

  beforeInsert(event: InsertEvent<ThoigianlichhenkhamngayEntity>): void {
    console.log(1111, event);
    
  }

  // beforeUpdate(event: UpdateEvent<UserEntity>): void {
    // if (event.entity!.password !== event.databaseEntity.password) {
    //   event.entity!.password = UtilsProvider.generateHash(
    //     event.entity!.password,
    //   );
    // }
  // }
}
