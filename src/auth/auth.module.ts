import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MyLoggerModule } from 'src/my-logger/my-logger.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({}), MyLoggerModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
