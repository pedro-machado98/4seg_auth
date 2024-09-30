import { Module } from '@nestjs/common';
import { AlunoController } from './aluno.controller';

@Module({
  controllers: [AlunoController]
})
export class AlunoModule {}
