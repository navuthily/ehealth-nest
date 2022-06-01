"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const gateway_1 = require("@apollo/gateway");
const api_config_service_1 = require("../../../libs/shared/services/api-config.service");
const shared_module_1 = require("../../../libs/shared/shared.module");
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const jsonwebtoken_1 = require("jsonwebtoken");
const google_notification_module_1 = require("./google-notification/google-notification.module");
const language_thongtinbenhvien_module_1 = require("./language-thongtinbenhvien/language-thongtinbenhvien.module");
const auth_module_1 = require("./auth/auth.module");
const nestjs_i18n_1 = require("nestjs-i18n");
const path_1 = require("path");
const user_module_1 = require("./user/user.module");
const user_entity_1 = require("./user/user.entity");
const chucvu_module_1 = require("./chucvu/chucvu.module");
const chucvu_entity_1 = require("./chucvu/chucvu.entity");
const chucdanh_entity_1 = require("./chucdanh/chucdanh.entity");
const chucdanh_module_1 = require("./chucdanh/chucdanh.module");
const dmtrinhdo_entity_1 = require("./dmtrinhdo/dmtrinhdo.entity");
const dmtrinhdo_module_1 = require("./dmtrinhdo/dmtrinhdo.module");
const dmloaitinhluong_entity_1 = require("./dmloaitinhluong/dmloaitinhluong.entity");
const dmloaitinhluong_module_1 = require("./dmloaitinhluong/dmloaitinhluong.module");
const dmbophan_module_1 = require("./dmbophan/dmbophan.module");
const dmbophan_entity_1 = require("./dmbophan/dmbophan.entity");
const dmphongban_entity_1 = require("./dmphongban/dmphongban.entity");
const dmphongban_module_1 = require("./dmphongban/dmphongban.module");
const dmloaikhoi_module_1 = require("./dmloaikhoi/dmloaikhoi.module");
const dmloaikhoi_entity_1 = require("./dmloaikhoi/dmloaikhoi.entity");
const nhanvienhopdong_entity_1 = require("./nhanvienhopdong/nhanvienhopdong.entity");
const nhanvienhopdong_module_1 = require("./nhanvienhopdong/nhanvienhopdong.module");
const dmloaihopdong_entity_1 = require("./dmloaihopdong/dmloaihopdong.entity");
const dmloaihopdong_module_1 = require("./dmloaihopdong/dmloaihopdong.module");
const chuyenkhoa_module_1 = require("./chuyenkhoa/chuyenkhoa.module");
const chuyenkhoa_entity_1 = require("./chuyenkhoa/chuyenkhoa.entity");
const templatehd_module_1 = require("./templatehd/templatehd.module");
const templatehd_entity_1 = require("./templatehd/templatehd.entity");
require('dotenv').config();
class AuthenticatedDataSource extends gateway_1.RemoteGraphQLDataSource {
    async willSendRequest({ request, context }) {
        const payload = await (0, jsonwebtoken_1.decode)(context.jwt);
        request.http.headers.set('x-user-id', payload);
    }
}
let BuildServiceModule = class BuildServiceModule {
};
BuildServiceModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: AuthenticatedDataSource,
                useValue: AuthenticatedDataSource,
            },
            {
                provide: graphql_1.GATEWAY_BUILD_SERVICE,
                useFactory: (AuthenticatedDataSource) => {
                    return ({ name, url }) => new AuthenticatedDataSource({ url });
                },
                inject: [AuthenticatedDataSource],
            },
        ],
        exports: [graphql_1.GATEWAY_BUILD_SERVICE],
    })
], BuildServiceModule);
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.forRoot({
                redis: {
                    host: 'localhost',
                    port: 6379,
                },
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [shared_module_1.SharedModule],
                useFactory: (configService) => {
                    const configDB = Object.assign({}, configService.typeOrmConfig('SV_EHEALTH_'));
                    configDB.entities = [
                        user_entity_1.UserEntity,
                        chucvu_entity_1.ChucvuEntity,
                        chucdanh_entity_1.ChucdanhEntity,
                        dmtrinhdo_entity_1.DmtrinhdoEntity,
                        dmloaitinhluong_entity_1.DmloaitinhluongEntity,
                        dmbophan_entity_1.DmbophanEntity,
                        dmphongban_entity_1.DmphongbanEntity,
                        dmloaikhoi_entity_1.DmloaikhoiEntity,
                        nhanvienhopdong_entity_1.NhanvienhopdongEntity,
                        dmloaihopdong_entity_1.DmloaihopdongEntity,
                        chuyenkhoa_entity_1.ChuyenkhoaEntity,
                        templatehd_entity_1.TemplateHdEntity,
                    ];
                    configDB.logging = true;
                    return configDB;
                },
                inject: [api_config_service_1.ApiConfigService],
            }),
            nestjs_i18n_1.I18nModule.forRootAsync({
                useFactory: (configService) => ({
                    fallbackLanguage: configService.fallbackLanguage,
                    parserOptions: {
                        path: (0, path_1.join)(__dirname, '../../../../../../', 'libs/i18n'),
                        watch: configService.isDevelopment,
                    },
                }),
                imports: [shared_module_1.SharedModule],
                parser: nestjs_i18n_1.I18nJsonParser,
                inject: [api_config_service_1.ApiConfigService],
            }),
            schedule_1.ScheduleModule.forRoot(),
            user_module_1.UserModule,
            google_notification_module_1.GoogleNotificationModule,
            language_thongtinbenhvien_module_1.LanguageThongtinbenhvienModule,
            auth_module_1.AuthModule,
            chucvu_module_1.ChucvuModule,
            chucdanh_module_1.ChucdanhModule,
            dmtrinhdo_module_1.DmtrinhdoModule,
            dmloaitinhluong_module_1.DmloaitinhluongModule,
            dmbophan_module_1.DmbophanModule,
            dmphongban_module_1.DmphongbanModule,
            dmloaikhoi_module_1.DmloaikhoiModule,
            nhanvienhopdong_module_1.NhanvienhopdongModule,
            dmloaihopdong_module_1.DmloaihopdongModule,
            chuyenkhoa_module_1.ChuyenkhoaModule,
            templatehd_module_1.TemplateHdModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map