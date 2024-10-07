import { MailerService } from '@nestjs-modules/mailer';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

import { AuthDto, AuthLogarDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private readonly mailService: MailerService
  ) {}

  async signup(dto: AuthDto, ip:any) {
    //gerar o hash da senha
    const hash = await argon.hash(dto.password);

    try {
      //salvar o usuario no banco
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          hash: hash,
          role: dto.role,
          IPAutorizado: ip,
          email: dto.email,
          loginErrado: false
        },
      });

      return this.signToken(user.id, user.username);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('Credenciais já foram cadastradas');
        }
      } else {
        throw e;
      }
    }
  }

  async signin(dto: AuthLogarDto, ip:any) {
    
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
        IPAutorizado: ip
      },
    });

    if (!user || user.IPAutorizado !== ip) {
      throw new ForbiddenException('Credenciais erradas ou não existem');
    }

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) {
      throw new ForbiddenException('Credenciais erradas');
      let number = Math.random() * (100000 - 999999) + 999999
      user.codigoValidador = number;
      this.sendMail(user.email, number)
    }

    return this.signToken(user.id, user.username);
  }

  async signToken(userId: string, telefone: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      telefone: telefone,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      secret: secret,
    });

    
    return {
      access_token: token,
    };
  }

  async sendMail(email, codigoValidador) {
    const message = `Esqueceu sua senha? Digite o codigo ${codigoValidador} para revalidar sua conta.`;



    this.mailService.sendMail({
      from: 'Pedro Machado <pedromachado2298@gmail.com>',
      to: email,
      subject: `Revalide sua conta.`,
      text: message,
    });
  }

}
