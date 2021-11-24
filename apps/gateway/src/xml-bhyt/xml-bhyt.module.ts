import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { XmlBHYTController } from './xml-bhyt.controller';
// import { EntityManager } from 'typeorm';
import { XmlBHYTProcessor } from './xml-bhyt.processor';
import { XmlBHYTService } from './xml-bhyt.service';

// @Module({
//   providers: [XmlBHYTService],
// })
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'xml-bhyt',
    }),
    HttpModule,
  ],
    controllers: [XmlBHYTController],
  providers: [XmlBHYTService, XmlBHYTProcessor],
})
export class XmlBHYTModule {}
