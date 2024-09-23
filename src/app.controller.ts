import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@ApiTags('Endpoint base')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  getAplicacaoOnline(): string {
    return this.appService.getAplicacaoOnline();
  }
}
