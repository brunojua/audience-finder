import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class FacebookApiService {

    url: string = 'https://graph.facebook.com/search?type=adinterest&q=[Guitarra]&limit=10000&locale=pt_BR&access_token=1164335983958612|e5sL4aJtKW_twITVaEnu8xMOnEw';
    token: string = '1164335983958612|e5sL4aJtKW_twITVaEnu8xMOnEw';

    constructor(private http: HttpClient) { }

    getDados(): Observable<any> {
        return this.http.get<any>(this.url)
        .pipe(
            map(data => {
                data;
                return data;
            })
        );
    }
}
