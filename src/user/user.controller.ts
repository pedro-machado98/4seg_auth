import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { User } from './entity';
import { Request as HttpRequest } from 'express';

interface UserJwtPayload {
  id: string,
}
type AuthRequest = HttpRequest & { user: UserJwtPayload }

@ApiTags('Dados do Usuario')
@Controller('users')
export class UserController {
  // /users/me
  @UseGuards(JwtGuard)
  @Get('eu')
  getDadosDoUsuario(@Req() req: AuthRequest) {
    console.log(typeof req.user.id)
    return req.user
  }

  @UseGuards(JwtGuard)
  @Post('eu')
  atualizaDadosdoUsuario(@Body() req: Request) {
    req.body;
  }
}
