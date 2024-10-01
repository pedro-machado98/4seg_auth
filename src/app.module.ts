import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AlunoModule } from './aluno/aluno.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfessorModule } from './professor/professor.module';
import { UserModule } from './user/user.module';
import { NotasModule } from './notas/notas.module';
import { WinstonModule } from 'nest-winston';
import winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console(),
      ],
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    MyLoggerModule,
    AlunoModule,
    ProfessorModule,
    NotasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
