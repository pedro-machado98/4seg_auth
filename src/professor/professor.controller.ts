import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';

@Controller('professor')
export class ProfessorController {

    @UseGuards(JwtGuard)
    @Get()
    getTurmasSemestre(): string {
        return "Você está dando aula de 4seg neste periodo";
    }
}
