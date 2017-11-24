import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  baseUrl:string;

  constructor(private http:Http) { 
    this.baseUrl = 'https://ifonline.herokuapp.com/login';
  }

  login(data) {
    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    let options = new RequestOptions({ headers: headers });
    const user = JSON.stringify(data);
    
    return this.http.post(this.baseUrl, user, options)
              .map(res => res.json())
  }


}