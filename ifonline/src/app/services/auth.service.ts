import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SERVER_URL } from './config.service';
import 'rxjs/add/operator/map';


let URL = SERVER_URL+'login'

@Injectable()
export class AuthService {

  baseUrl:string;

  constructor(private http:Http) { }

  login(data) {
    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    let options = new RequestOptions({ headers: headers });
    const user = JSON.stringify(data);
    
    return this.http.post(URL, user, options)
              .map(res => res.json())
  }


}