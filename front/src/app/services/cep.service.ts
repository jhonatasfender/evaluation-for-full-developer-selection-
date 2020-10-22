
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CEP } from '~app/models/cep';

const BASE_URL = 'https://viacep.com.br/ws';

@Injectable()
export class CEPService {

    constructor() { }

    public search(cep: string): Observable<CEP> {
        return new Observable<CEP>((x) => {
            console.log(x);
            const request = new XMLHttpRequest();
            request.open('get', `${BASE_URL}/${cep}/json`, true);
            request.send();
            request.onload = function () {
                const data: CEP = JSON.parse(this.response);
                x.next(data);
            };
        });
    }
}
