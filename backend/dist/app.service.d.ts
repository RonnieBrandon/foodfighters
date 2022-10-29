import { HttpService } from '@nestjs/axios';
export declare class AppService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getFoods(searchQuery: string): Promise<any>;
}
