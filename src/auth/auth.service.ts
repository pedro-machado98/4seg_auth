import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { MyLoggerService } from 'src/my-logger/my-logger.service';
import { PrismaService } from 'src/prisma/prisma.service';

import { AuthDto, AuthLogarDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private logger: MyLoggerService,
  ) {}

  async signup(dto: AuthDto) {
    //gerar o hash da senha
    const hash = await argon.hash(dto.password);

    try {
      //salvar o usuario no banco
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          hash: hash,
        },
      });

      // Log de sucesso no cadastro
      this.logger.log(`Usuário ${dto.username} cadastrado com sucesso`);

      //retornar o usuario salvo
      return this.signToken(user.id, user.username);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          this.logger.warn(`Tentativa de cadastro com credenciais duplicadas: ${dto.username}`);
          throw new ForbiddenException('Credenciais já foram cadastradas');
        }
      } else {
        this.logger.error(`Erro desconhecido ao cadastrar usuário ${dto.username}: ${e.message}`);
        throw e;
      }
    }
  }

  async signin(dto: AuthLogarDto) {
    this.logger.log(`Tentativa de login do usuário ${dto.username}`);
    
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });

    if (!user) {
      this.logger.warn(`Tentativa de login com credenciais inválidas: ${dto.username}`);
      throw new ForbiddenException('Credenciais erradas ou não existem');
    }

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) {
      this.logger.warn(`Login falhou para o usuário ${dto.username}: senha incorreta`);
      throw new ForbiddenException('Credenciais erradas');
    }

    this.logger.log(`Login bem-sucedido para o usuário ${dto.username}`);
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

    this.logger.log(`Token gerado para o usuário ID: ${userId}`);
    
    return {
      access_token: token,
    };
  }
}
