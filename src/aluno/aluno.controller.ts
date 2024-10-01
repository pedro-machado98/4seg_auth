import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { HasRoles } from 'src/auth/decorator/has-roles.decorator';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

import { Role } from '../auth/model/role.enum';
import { Logger } from 'winston';

@Controller('aluno')
@UseGuards(JwtGuard, RolesGuard)
export class AlunoController {

    constructor(
        @Inject('winston')
        private readonly logger: Logger,
    ) { }

    @HasRoles(Role.Admin)
    @Get()
    getAllAlunos() {
        return "Lista de todos os alunos";
    }

    @HasRoles(Role.Admin, Role.Professor)
    @Get(':id')
    getAlunoById(@Param('id') id: string) {
        return `Aluno com ID ${id}`;
    }

    @HasRoles(Role.Admin)
    @Post()
    createAluno(@Body() alunoData: any) {
        return "Aluno criado";
    }

    @HasRoles(Role.Admin)
    @Put(':id')
    updateAluno(@Param('id') id: string, @Body() alunoData: any) {
        return `Aluno com ID ${id} atualizado`;
    }

    @HasRoles(Role.Admin)
    @Delete(':id')
    deleteAluno(@Param('id') id: string) {
        return `Aluno com ID ${id} deletado`;
    }
}
