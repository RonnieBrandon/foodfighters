import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('foods/:searchQuery')
  getFoods(@Param('searchQuery') searchQuery: string) {
    return this.appService.getFoods(searchQuery);
  }
}
