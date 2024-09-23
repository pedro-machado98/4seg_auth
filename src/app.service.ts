import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAplicacaoOnline(): string {
    return 'Aplicação Online!';
  }
}
