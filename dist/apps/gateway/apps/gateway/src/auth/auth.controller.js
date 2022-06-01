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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_user_decorator_1 = require("../../../../libs/decorators/auth-user.decorator");
const swagger_schema_1 = require("../../../../libs/decorators/swagger.schema");
const auth_guard_1 = require("../../../../libs/guards/auth.guard");
const auth_user_interceptor_service_1 = require("../../../../libs/interceptors/auth-user-interceptor.service");
const interfaces_1 = require("../../../../libs/interfaces");
const user_dto_1 = require("../user/dto/user-dto");
const user_entity_1 = require("../user/user.entity");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("./auth.service");
const LoginPayloadDto_1 = require("./dto/LoginPayloadDto");
const UserLoginDto_1 = require("./dto/UserLoginDto");
const UserRegisterDto_1 = require("./dto/UserRegisterDto");
let AuthController = class AuthController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async userLogin(userLoginDto) {
        const userEntity = await this.authService.validateUser(userLoginDto);
        const token = await this.authService.createToken(userEntity);
        return new LoginPayloadDto_1.LoginPayloadDto(userEntity.toDto(), token);
    }
    async userRegister(userRegisterDto) {
        const createdUser = await this.userService.reigisterUser(userRegisterDto);
        return createdUser.toDto({
            isActive: true,
        });
    }
    getCurrentUser(user) {
        return user.toDto();
    }
};
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({
        type: LoginPayloadDto_1.LoginPayloadDto,
        description: 'User info with access token',
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dto/LoginPayloadDto").LoginPayloadDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserLoginDto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userLogin", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ type: user_dto_1.UserDto, description: 'Successfully Registered' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../user/dto/user-dto").UserDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserRegisterDto_1.UserRegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userRegister", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)('me'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(auth_user_interceptor_service_1.AuthUserInterceptor),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({ type: user_dto_1.UserDto, description: 'current user info' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../user/dto/user-dto").UserDto }),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", user_dto_1.UserDto)
], AuthController.prototype, "getCurrentUser", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map