import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs';

@Injectable()
export class UserService {

  baseUrl:string;

  constructor(public http:Http) {
    this.baseUrl = 'https://ifonline.herokuapp.com/user';
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

  update(token, data) {
    let headers = new Headers();
    headers.append('Authorization','Bearer '+token);
    headers.append('Accept','application/json');
    headers.append('Content-Type','application/json; charset=UTF-8');
    let options = new RequestOptions({ headers: headers });

    data.typeUser = 'STUDENT';
    const user = JSON.stringify(data); 

    return this.http.put(this.baseUrl+'/'+data._id, data, options)
              .map( res => res.json())
    
    /*
    return new Promise((resolve, reject) => {
      this.http.put(this.baseUrl, user, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        })
    })
    */
  }



}
