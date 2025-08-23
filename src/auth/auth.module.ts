import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.staregy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
