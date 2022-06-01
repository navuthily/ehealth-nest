"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleNotificationModule = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const google_notification_controller_1 = require("./google-notification.controller");
const google_notification_processor_1 = require("./google-notification.processor");
const axios_1 = require("@nestjs/axios");
let GoogleNotificationModule = class GoogleNotificationModule {
};
GoogleNotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({
                name: 'google-notification',
            }),
            axios_1.HttpModule,
        ],
        controllers: [google_notification_controller_1.GoogleNotificationController],
        providers: [google_notification_processor_1.GoogleNotificationProcessor],
    })
], GoogleNotificationModule);
exports.GoogleNotificationModule = GoogleNotificationModule;
//# sourceMappingURL=google-notification.module.js.map