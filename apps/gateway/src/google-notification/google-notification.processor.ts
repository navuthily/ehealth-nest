import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

@Processor('google-notification')
@Injectable()
export class GoogleNotificationProcessor {
  @Process('nhaxe')
  async handleTranscode(job: Job) {
    const data = job.data;
    const barcode_a = data.barcode.substr(3, 1);
    const barcode_b = data.barcode.substr(10, 2);
    const plateNumber = data.plateNumber;
    const result= await admin.messaging().sendToTopic('all', {
        notification: {
          title: 'Có xe mới',
          body: `Tầng: ${barcode_a} - Slot:${barcode_b}. \r\nBiển số: ${plateNumber}`,
        },
    });
    console.log(result)
    return result
  }
}
