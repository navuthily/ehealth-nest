import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LanguageThongtinbenhvienController } from './language-thongtinbenhvien.controller';
import { LanguageThongtinbenhvienService } from './language-thongtinbenhvien.service';

// @Module({
//   providers: [XmlBHYTService],
// })
@Module({
  imports: [
    HttpModule,
  ],
    controllers: [LanguageThongtinbenhvienController],
  providers: [LanguageThongtinbenhvienService],
})
export class LanguageThongtinbenhvienModule {}
