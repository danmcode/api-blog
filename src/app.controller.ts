import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Env } from './env.model';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService<Env>,
  ) { }

  @Get()
  getHello(): string {
    const myVar = this.configService.get('MY_VAR');
    const hello = this.appService.getHello();
    return `${hello} - ${myVar}`;
  }
}
