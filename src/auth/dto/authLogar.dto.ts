import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AuthLogarDto {

    @IsString()
    @IsNotEmpty()
    username: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;

}