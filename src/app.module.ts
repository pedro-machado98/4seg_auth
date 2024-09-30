import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { AluneModule } from './alune/alune.module';
import { AlunoModule } from './aluno/aluno.module';
import { ProfessorModule } from './professor/professor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    MyLoggerModule,
    AluneModule,
    AlunoModule,
    ProfessorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
