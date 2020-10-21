import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '~app/models/client';
import { CONSTANST } from '~utils/constanst';

@Injectable()
export class ClientService {
    loading = true;

    constructor(private http: HttpClient) { }

    getList(sortActive: string, order: string, pageSize: number, page: number, search: string) {
        let params = new HttpParams();
        params = params.append('active', sortActive);
        params = params.append('order', order);
        params = params.append('search', search);
        params = params.append('pageSize', pageSize.toString());
        params = params.append('page', page.toString());

        return this.http.get<Client[]>(CONSTANST.routes.client.list, { params: params });
    }

    delete(id: number) {
        return this.http.delete<Client>(CONSTANST.routes.client.delete.replace(':id', String(id)));
    }

    getOne(id: number) {
        return this.http.get<Client>(CONSTANST.routes.client.get.replace(':id', String(id)));
    }

    save(client: Client) {
        return this.http.post<Client>(CONSTANST.routes.client.save, client);
    }

}
