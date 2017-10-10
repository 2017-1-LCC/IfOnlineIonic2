import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
//import { NavController } from 'ionic-angular';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  baseUrl:string;

  constructor(private http:Http) { 
    this.http = http;
    this.baseUrl = 'https://ifonline.herokuapp.com/login';
  }

  login(data) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    /*
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    headers.append('Cache-Control', 'no-cache');
    headers.append('Access-Control-Allow-Methods','GET, POST');
    headers.append('Access-Control-Allow-Headers','Content-Type, Accept');
    headers.append('Access-Control-Max-Age','1728000');
    */
    let options = new RequestOptions({ headers: headers });
    const user = JSON.stringify(data); 

    this.http.post(this.baseUrl, user, options)
      .map(res => res.json())
      .subscribe(data => {
        console.log("data",data);
       }, error => {
        console.log(error);// Error getting the data
      });

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