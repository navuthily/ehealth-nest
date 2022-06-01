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
exports.UserService = void 0;
const page_dto_1 = require("../../../../libs/common/dto/page.dto");
const file_not_image_exception_1 = require("../../../../libs/exceptions/file-not-image.exception");
const user_not_found_exception_1 = require("../../../../libs/exceptions/user-not-found.exception");
const interfaces_1 = require("../../../../libs/interfaces");
const aws_s3_service_1 = require("../../../../libs/shared/services/aws-s3.service");
const validator_service_1 = require("../../../../libs/shared/services/validator.service");
const types_1 = require("../../../../libs/types");
const user_repository_1 = require("./user.repository");
const crud_typeorm_1 = require("@nestjsx/crud-typeorm");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const ses = require("node-ses");
let UserService = class UserService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(userRepository, validatorService, awsS3Service, repo) {
        super(repo);
        this.userRepository = userRepository;
        this.validatorService = validatorService;
        this.awsS3Service = awsS3Service;
    }
    async reigisterUser(userRegisterDto) {
        const usercheck = await this.userRepository.findOne({
            email: userRegisterDto.email,
        });
        if (usercheck)
            throw new common_1.BadRequestException('user ready exist');
        const user = this.userRepository.create(userRegisterDto);
        return this.userRepository.save(user);
    }
    async createUser(userDto) {
        const usercheckEmail = await this.userRepository.findOne({
            email: userDto.email,
        });
        if (usercheckEmail)
            throw new common_1.BadRequestException(`user with email ${userDto.email} ready exist`);
        const randomstring = Math.random().toString(36).slice(-8);
        userDto.password = randomstring;
        const user = this.userRepository.create(userDto);
        const client = ses.createClient({
            key: process.env.KEY_SES || '',
            secret: process.env.SECRET_SES || '',
        });
        client.sendEmail({
            to: userDto.email,
            from: 'testing@nana21.online',
            subject: 'Thông tin tài khoản sử dụng hệ thống Ehealth Family',
            message: `<b>Xin chào ${userDto.holotNhanVien} ${userDto.tennhanvien},</b><br/> Tài khoản đăng nhập vào hệ thống Ehealth Family của bạn là: <br/> Email:
          ${userDto.email} - password: ${userDto.password}`,
            altText: 'plain text',
        }, function (err, data, res) {
            console.log(data, 'aaaa');
        });
        return this.userRepository.save(user);
    }
    async getUser(userId) {
        const queryBuilder = this.userRepository.createQueryBuilder('dm_nhanvien');
        queryBuilder.where('dm_nhanvien.id_nhanvien = :userId', { userId });
        const userEntity = await queryBuilder.getOne();
        if (!userEntity) {
            throw new user_not_found_exception_1.UserNotFoundException();
        }
        return userEntity.toDto();
    }
    getAllNhanVien() {
        return this.repo.find();
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        validator_service_1.ValidatorService,
        aws_s3_service_1.AwsS3Service, Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map