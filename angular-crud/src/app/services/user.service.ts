import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CONSTANST } from '~utils/constanst';
import { User } from '~models/user';
import { Response } from '~models/response';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
  ) { }

  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  getList(sortActive: string, order: string, pageSize: number, page: number, search: string) {
    let params = new HttpParams();
    params = params.append('active', sortActive);
    params = params.append('order', order);
    params = params.append('search', search);
    params = params.append('pageSize', pageSize.toString());
    params = params.append('page', page.toString());

    return this.http.get<Response>(
      CONSTANST.routes.client.list,
      { headers: this.headers, params: params }
    );
  }

  delete(id: number) {
    return this.http.delete<Response>(
      CONSTANST.routes.client.delete.replace(':id', String(id)),
      { headers: this.headers }
    );
  }

  getOne(id: number) {
    return this.http.get<Response>(
      CONSTANST.routes.client.get.replace(':id', String(id)),
      { headers: this.headers }
    );
  }

  save(user: User) {
    return this.http.post<Response>(
      CONSTANST.routes.client.save, { user }, { headers: this.headers }
    );
  }
}
