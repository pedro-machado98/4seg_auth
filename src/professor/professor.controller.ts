import { Controller, Get, UseGuards } from '@nestjs/common';
import { HasRoles } from 'src/auth/decorator/has-roles.decorator';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

import { Role } from '../auth/model/role.enum';

@Controller('professor')
export class ProfessorController {

    @HasRoles(Role.Professor)
    @UseGuards(JwtGuard, RolesGuard)
    @Get()
    getTurmasSemestre(): string {
        return "Você está dando aula de 4seg neste periodo";
    }
}
