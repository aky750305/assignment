import { Injectable } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';

@Injectable()
export class FetchDataService {
    apiUrl = 'https://671e6dac1dfc4299198246a8.mockapi.io/api/v1';
    constructor(private http: HttpClient) {}

    loginUser(data: any) {
        return this.http.get<any[]>(`${this.apiUrl}/users`, {params: data})
    }

    listingData(data: any) {
        return data.type === 'admin' ? 
            this.http.get<any[]>(`${this.apiUrl}/users`, {params: {type: 'caregiver'}})
            : this.http.get<any[]>(`${this.apiUrl}/patients`, {params: {caregiver_id: data.id}})
    }

    deleteData(data: any) {
        return data.type === 'admin' ? 
            this.http.delete<any[]>(`${this.apiUrl}/users`, {params: {id: data.deleteId}})
            : this.http.delete<any[]>(`${this.apiUrl}/patients`, {params: {id: data.deleteId}})
    } 

    addCareGiver(payload: any) {
        return this.http.post<any[]>(`${this.apiUrl}/users`, payload)
    }
    editCareGiver(payload: any) {
        return this.http.put<any[]>(`${this.apiUrl}/users/${payload.id}`, payload)
    }

    addPatients(payload: any) {
        return this.http.post<any[]>(`${this.apiUrl}/patients`, payload)
    }
    editPatients(payload: any) {
        return this.http.put<any[]>(`${this.apiUrl}/patients/${payload.id}`, payload)
    }
}