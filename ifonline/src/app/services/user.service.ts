import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs';

@Injectable()
export class UserService {

  baseUrl:string;

  constructor(public http:Http) {
    this.baseUrl = 'https://ifonline.herokuapp.com/user';
  }

  create(data) {
    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    let options = new RequestOptions({ headers: headers });

    data.typeUser = 'STUDENT';
    const user = JSON.stringify(data);

    return  this.http.post(this.baseUrl, user, options)
        .map(res => res.json())
  }

  update(token, data) {
    let headers = new Headers();
    headers.append('Authorization','Bearer '+token);
    headers.append('Accept','application/json');
    headers.append('Content-Type','application/json; charset=UTF-8');
    let options = new RequestOptions({ headers: headers });

    const user = JSON.stringify(data); 

    return this.http.put(this.baseUrl+'/'+data._id, user, options)
              .map( res => res.json())

  }



}
