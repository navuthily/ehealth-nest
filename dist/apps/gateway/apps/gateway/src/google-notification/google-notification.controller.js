"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleNotificationController = void 0;
const openapi = require("@nestjs/swagger");
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nhaxe_dto_1 = require("./dto/nhaxe.dto");
let GoogleNotificationController = class GoogleNotificationController {
    constructor(googleNotificationQueue) {
        this.googleNotificationQueue = googleNotificationQueue;
    }
    async nhaxe(nhaxe) {
        this.googleNotificationQueue.add('nhaxe', nhaxe);
        return 'Done';
    }
};
__decorate([
    (0, common_1.Post)('nhaxe'),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nhaxe_dto_1.NhaXeDTO]),
    __metadata("design:returntype", Promise)
], GoogleNotificationController.prototype, "nhaxe", null);
GoogleNotificationController = __decorate([
    (0, swagger_1.ApiTags)('google-notification'),
    (0, common_1.Controller)('google-notification'),
    __param(0, (0, bull_1.InjectQueue)('google-notification')),
    __metadata("design:paramtypes", [Object])
], GoogleNotificationController);
exports.GoogleNotificationController = GoogleNotificationController;
//# sourceMappingURL=google-notification.controller.js.map