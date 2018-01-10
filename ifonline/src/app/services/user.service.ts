import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SERVER_URL } from './config.service';
import 'rxjs';

let URL = SERVER_URL + 'user/';

@Injectable()
export class UserService {

  constructor(public http:Http) {  }

  create(data) {
    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    let options = new RequestOptions({ headers: headers });

    data.typeUser = 'STUDENT';
    const user = JSON.stringify(data);

    return  this.http.post(URL, user, options)
        .map(res => res.json())
  }

  update(token, data) {
    let headers = new Headers();
    headers.append('Authorization','Bearer '+token);
    headers.append('Accept','application/json');
    headers.append('Content-Type','application/json; charset=UTF-8');
    let options = new RequestOptions({ headers: headers });

    const user = JSON.stringify(data); 

    return this.http.put(URL+data._id, user, options)
              .map( res => res.json())

  }



}
