import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs';

@Injectable()
export class UserService {

  baseUrl:string;

  constructor(public http:Http) {
    this.baseUrl = 'http://localhost:3000/user';
  }

  create(data) {
    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    let options = new RequestOptions({ headers: headers });

    data.typeUser = 'STUDENT';
    const user = JSON.stringify(data); 
    
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl, user, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        })
    })
  }



}
