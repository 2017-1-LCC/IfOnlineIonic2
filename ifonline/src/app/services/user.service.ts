import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  baseUrl:string;

  constructor(private http:Http) {
    this.http = http;
    this.baseUrl = 'https://ifonline.herokuapp.com/user';
  }

  create(data) {
    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    data.typeUser = 'STUDENT';
    //data.birthDate = new Date(data.birthDate);
    let options = new RequestOptions({ headers: headers });
    const user = JSON.stringify(data); 

    return this.http.post(this.baseUrl, user, options)
            .map(res => res.json())
           //.catch(err => err);

  }

   handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
