import { Body, Controller, Ip, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthDto, AuthLogarDto } from './dto';
import { access_token } from './entity';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'Usuario criado',
    type: access_token,
    isArray: false,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request'
  })
  @ApiForbiddenResponse({
    description:"Credenciais ja foram cadastradas"
  })
  @Post('/cadastrar')
  singup(@Ip() ip,  @Body() dto: AuthDto) : Promise<{ access_token: string }> {
    console.log(dto);
    return this.authService.signup(dto, ip);
  }

  @ApiCreatedResponse({
    description: 'Usuario criado',
    type: access_token,
    isArray: false,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request'
  })
  @ApiForbiddenResponse({
    description:"Credenciais erradas ou não existem"
  })
  @Post('/logar')
  singin(@Ip() ip, @Body() dto: AuthLogarDto) {
    return this.authService.signin(dto, ip);
  }
}
