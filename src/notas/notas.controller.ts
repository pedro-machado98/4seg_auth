import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { HasRoles } from 'src/auth/decorator/has-roles.decorator';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

import { Role } from '../auth/model/role.enum';

@Controller('notas')
@UseGuards(JwtGuard, RolesGuard)
export class NotasController {

    @HasRoles(Role.Professor)
    @Get()
    getAllNotas() {
        return "Lista de todas as notas";
    }

    @HasRoles(Role.Professor)
    @Get(':id')
    getNotaById(@Param('id') id: string) {
        return `Nota com ID ${id}`;
    }

    @HasRoles(Role.Professor)
    @Post()
    createNota(@Body() notaData: any) {
        return "Nota criada";
    }

    @HasRoles(Role.Professor)
    @Put(':id')
    updateNota(@Param('id') id: string, @Body() notaData: any) {
        return `Nota com ID ${id} atualizada`;
    }

    @HasRoles(Role.Professor)
    @Delete(':id')
    deleteNota(@Param('id') id: string) {
        return `Nota com ID ${id} deletada`;
    }
}
