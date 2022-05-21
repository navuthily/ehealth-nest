import { UserEntity } from 'apps/gateway/src/user/user.entity';
import Faker from 'faker';
import { define } from 'typeorm-seeding';
define(UserEntity, (faker: typeof Faker) => {
  const email = faker.internet.email();
  const pass = faker.random.word();
  const user = new UserEntity();
  user.tennhanvien = faker.name.firstName();
  user.holotNhanVien = faker.name.lastName();
  user.email = email;
  user.role = 'USER';
  user.password = pass;
  return user;
});
