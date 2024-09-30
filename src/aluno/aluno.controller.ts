import { Controller, Get, UseGuards } from '@nestjs/common';
import { HasRoles } from 'src/auth/decorator/has-roles.decorator';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

import { Role } from '../auth/model/role.enum';

@Controller('aluno')
export class AlunoController {

    @HasRoles(Role.Aluno)
    @UseGuards(JwtGuard, RolesGuard)
    @Get()
    getTurmasSemestre(): string {
        return "Você está inscrito em 4seg neste semestre";
    }
  
}
