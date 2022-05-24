// import './src/boilerplate.polyfill';

import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

// import { UserSubscriber } from './src/entity-subscribers/user-subscriber';
// import { SnakeNamingStrategy } from './src/snake-naming.strategy';

const configs: TypeOrmModuleOptions & { seeds: string[]; factories: string[] } =
  {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'authentication',
    // namingStrategy: new SnakeNamingStrategy(),
    // subscribers: [TGLHKNSubscriber],
    entities: ['src/modules/**/*.entity{.ts,.js}'],

    migrationsRun: false,
  };

module.exports = configs;
