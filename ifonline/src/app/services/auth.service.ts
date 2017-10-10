import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
//import { NavController } from 'ionic-angular';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  http:any;
  baseUrl:string;

  constructor(http:Http) { 
    this.http = http;
    this.baseUrl = 'https://darkSide:3000/login';
  }

  login(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(this.baseUrl,JSON.stringify(user),{headers:headers})
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      })
  }

/*
  login(user): Observable<boolean> {

    return this.http.post('URL', user, {
      headers: headers
    }).map(res => {
      this.storage.set('auth_token', res.json().auth_token);
      return true;
    });

  }
*/
}