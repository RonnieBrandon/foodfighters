import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {

  constructor(private readonly httpService: HttpService) {}

  async getFoods(searchQuery: string) {
    const url = `https://fineli.fi/fineli/api/v1/foods?q=${searchQuery}`;
    const { data } = await firstValueFrom(this.httpService.get(url));
    return data;
  }
}