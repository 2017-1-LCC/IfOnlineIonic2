import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class GroupService {

  baseUrl:string;

  constructor(public http:Http) {
    this.baseUrl = 'http://localhost:3000/studygroup';
  }

  loadGroups(data) {
    let headers = new Headers();
    let token = 'Bearer '+data;
    headers.append('Authorization',token);
    let options = new RequestOptions({ headers: headers });
    return new Promise( ( resolve, reject ) => {
      this.http.get(this.baseUrl, options)
        .map(res => res.json())
        .subscribe( data => {
          resolve(data);
        }, err => {
          reject(err);
        })
    })
      
  }

  createGroup(token, data) {
    let headers = new Headers();
    let authToken = 'Bearer '+token;
    headers.append('Authorization',authToken);
    headers.append('Accept','application/json');
    headers.append('Content-Type','application/json; charset=UTF-8');
    let options = new RequestOptions({ headers: headers });

    const group = JSON.stringify(data);

    return new Promise(( resolve, reject ) => {
      this.http.post(this.baseUrl, group, options)
        .map( res => res.json())
        .subscribe( data => {
          resolve(data);
        }, err => {
          reject(err);
        })
    })
  }
}