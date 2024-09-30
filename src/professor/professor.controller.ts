import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { HasRoles } from 'src/auth/decorator/has-roles.decorator';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

import { Role } from '../auth/model/role.enum';

@Controller('professor')
@UseGuards(JwtGuard, RolesGuard)
export class ProfessorController {

    @HasRoles(Role.Professor)
    @Get()
    getTurmasSemestre(): string {
        return "Você está dando aula de 4seg neste periodo";
    }

    @HasRoles(Role.Professor)
    @Get(':id')
    getProfessorById(@Param('id') id: string) {
        return `Professor com ID ${id}`;
    }

    @HasRoles(Role.Admin)
    @Post()
    createProfessor(@Body() professorData: any) {
        return "Professor criado";
    }

    @HasRoles(Role.Admin)
    @Put(':id')
    updateProfessor(@Param('id') id: string, @Body() professorData: any) {
        return `Professor com ID ${id} atualizado`;
    }

    @HasRoles(Role.Admin)
    @Delete(':id')
    deleteProfessor(@Param('id') id: string) {
        return `Professor com ID ${id} deletado`;
    }
}
