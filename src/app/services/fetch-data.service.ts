import { Injectable } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';

@Injectable()
export class FetchDataService {
    apiUrl = 'https://671e6dac1dfc4299198246a8.mockapi.io/api/v1/';
    constructor(private http: HttpClient) {}

    loginUser(data: any) {
        return this.http.get<any[]>(`${this.apiUrl}/users`, {params: data})
    }
}