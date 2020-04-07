import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class FacebookApiService {

    url: string;

    constructor(private http: HttpClient) { }

    getDados() {
        return this.http.get<any[]>('');
    }


}
