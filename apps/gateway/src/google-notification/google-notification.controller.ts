import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { NhanLayXeDTO } from './dto/nhanlayxe.dto';
import { NhaXeDTO } from './dto/nhaxe.dto';

@Controller('google-notification')
export class GoogleNotificationController {
  constructor(
    @InjectQueue('google-notification')
    private readonly googleNotificationQueue: Queue,
  ) {}

  @Post('nhaxe')
  async nhaxe(@Body() nhaxe: NhaXeDTO) {
    this.googleNotificationQueue.add('nhaxe', nhaxe);
    return 'Done';
  }
}
