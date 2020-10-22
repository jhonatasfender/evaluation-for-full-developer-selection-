import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Client, ClientsList } from '~app/models/client';
import { CONSTANST } from '~utils/constanst';

@Injectable()
export class ClientService {
    public loading = true;

    constructor(private http: HttpClient) { }

    public getList(
        sortActive: string,
        order: string,
        pageSize: number,
        page: number,
        search: string
    ): Observable<ClientsList> {
        let params = new HttpParams();
        params = params.append('active', sortActive);
        params = params.append('order', order);
        params = params.append('search', search);
        params = params.append('pageSize', pageSize.toString());
        params = params.append('page', page.toString());

        return this.http.get<ClientsList>(CONSTANST.routes.client.list, { params: params });
    }

    public delete(id: number): Observable<Client> {
        return this.http.delete<Client>(CONSTANST.routes.client.delete.replace(':id', String(id)));
    }

    public getOne(id: number): Observable<Client> {
        return this.http.get<Client>(CONSTANST.routes.client.get.replace(':id', String(id)));
    }

    public save(client: Client): Observable<Client> {
        return this.http.post<Client>(CONSTANST.routes.client.save, client);
    }

}
