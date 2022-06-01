// import './src/boilerplate.polyfill';

import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

// import { UserSubscriber } from './src/entity-subscribers/user-subscriber';
// import { SnakeNamingStrategy } from './src/snake-naming.strategy';

const configs: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'bpuquygpfgcgeo4fjkks-mysql.services.clever-cloud.com',
  port: 3306,
  username: 'ufaqi3gzlmpfuwdr',
  password: 'tHU17ojPwILywzgTuHf5',
  database: 'bpuquygpfgcgeo4fjkks',
  // namingStrategy: new SnakeNamingStrategy(),
  // subscribers: [TGLHKNSubscriber],
  entities: ['src/modules/**/*.entity{.ts,.js}'],

  migrationsRun: false,
};

module.exports = configs;
