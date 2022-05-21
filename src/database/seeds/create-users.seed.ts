/* eslint-disable import/no-default-export */
import { UserEntity } from 'apps/gateway/src/user/user.entity';
import  { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';


export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(UserEntity)().createMany(10)
  }
}