import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserService {

  baseUrl:string;
  data:any;

  constructor(public http:Http) {
    this.baseUrl = 'http://darkSide:3000/user';
  }

  create(data) {
    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json; charset=UTF-8');

    data.typeUser = 'STUDENT';
    //data.birthDate = new Date(data.birthDate);
    let options = new RequestOptions({ headers: headers });
    const user = JSON.stringify(data); 
    
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl, user, options)
        .map(res => res.json())
        .subscribe(data => {
          console.log("data service: ",data);
          resolve(data);
        }, (err) => {
          reject(err);
        })
    })

  }

}
