// import './src/boilerplate.polyfill';

import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

// import { UserSubscriber } from './src/entity-subscribers/user-subscriber';
// import { SnakeNamingStrategy } from './src/snake-naming.strategy';

const configs: TypeOrmModuleOptions & { seeds: string[]; factories: string[] } =
  {
    type: 'mssql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    // namingStrategy: new SnakeNamingStrategy(),
    // subscribers: [TGLHKNSubscriber],
    entities: ['src/modules/**/*.entity{.ts,.js}'],
    migrations: ['src/database/migrations/*{.ts,.js}'],
    seeds: ['src/database/seeds/**/*{.ts,.js}'],
    factories: ['src/database/factories/**/*{.ts,.js}'],
    options: { encrypt: false },
    migrationsRun: true,
  };

module.exports = configs;
