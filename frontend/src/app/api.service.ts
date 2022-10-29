import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  constructor(private http: HttpClient) {}

  getFoods(searchQuery: string) {
    return this.http.get(`${environment.api}/foods/${searchQuery}`);
  }

}
