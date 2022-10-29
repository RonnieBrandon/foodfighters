import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getFoods(searchQuery: string): Promise<any>;
}
