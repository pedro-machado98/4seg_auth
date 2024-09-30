import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';

@Controller('aluno')
export class AlunoController {

    @UseGuards(JwtGuard)
    @Get()
    getTurmasSemestre(): string {
        return "Você está inscrito em 4seg neste semestre";
    }
  
}
