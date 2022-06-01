// import './src/boilerplate.polyfill';

import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

// import { UserSubscriber } from './src/entity-subscribers/user-subscriber';
// import { SnakeNamingStrategy } from './src/snake-naming.strategy';

const configs: TypeOrmModuleOptions & { seeds: string[]; factories: string[] } =
  {
    type: 'mysql',
    host: 'bp9aco9m7rh7y0yzzash-mysql.services.clever-cloud.com',
    port: 3306,
    username: 'u1gr5f9dbcrwagwh',
    password: '6Z0hbQeGj9FoXQQR3oJD',
    database: 'bp9aco9m7rh7y0yzzash',
    // namingStrategy: new SnakeNamingStrategy(),
    // subscribers: [TGLHKNSubscriber],
    entities: ['src/modules/**/*.entity{.ts,.js}'],

    migrationsRun: false,
  };

module.exports = configs;
