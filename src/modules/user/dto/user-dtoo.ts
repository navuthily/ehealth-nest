import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { UserEntity } from '../user.entity';

export type UserDtoOptions = Partial<{ isActive: boolean }>;

export class UserDtoo extends AbstractDto {
  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  lastName?: string;

  @ApiPropertyOptional()
  username?: string;

  @ApiPropertyOptional()
  avatar?: string;

  @ApiPropertyOptional()
  phone?: string;
  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  isActive?: boolean;

  // Sử dụng khi gọi .toDto()
  constructor(user: UserEntity, options?: UserDtoOptions) {
    super(user);
    this.email = user.email;
    // this.lastName = user.lastName;
    // this.role = user.role;
    this.username = user.username;
    // this.avatar = user.avatar;
    // this.phone = user.phone;
    this.isActive = options?.isActive;
  }
}
