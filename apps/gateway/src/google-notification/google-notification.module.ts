import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { GoogleNotificationController } from './google-notification.controller';
import { GoogleNotificationProcessor } from './google-notification.processor';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'google-notification',
    }),
    HttpModule,
  ],
  controllers: [GoogleNotificationController],
  providers: [GoogleNotificationProcessor],
})
export class GoogleNotificationModule {}
