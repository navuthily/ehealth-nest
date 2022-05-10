import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Column } from 'typeorm';
import { Trim } from '@libs/decorators/transforms.decorator';

export class UserRegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly tennhanvien: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly holotNhanVien: string;



  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Trim()
  readonly email: string;

  @ApiProperty({ minLength: 6 })
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty()
  @Column()
  @IsPhoneNumber()
  @IsOptional()
  phone: string;
}
