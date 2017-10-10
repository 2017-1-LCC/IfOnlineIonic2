import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {

  http:any;
  baseUrl:string;

  constructor(http:Http) {
    this.http = http;
    this.baseUrl = 'http://localhost:3000/user';
  }

  create(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(headers);
    this.http.post(this.baseUrl,JSON.stringify(data),{headers:headers})
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      })
  }
}
