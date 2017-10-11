import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs';

@Injectable()
export class ProfileService {

    baseUrl:string;

    constructor(public http:Http) {

    }

    loadProfile(user) {
        let headers = new Headers();
        let token = 'Bearer '+user.token;
        headers.append('Authorization',token);
        let options = new RequestOptions({ headers: headers });

        if(user.typeUser === 'TEACHER') {
            this.baseUrl = 'http://localhost:3000/findteacherbyuser/'+user.idUser;
        } else {
            this.baseUrl = 'http://localhost:3000/findstudentbyuser/'+user.idUser;
        }

        return new Promise((resolve, reject) => {
            this.http.get(this.baseUrl, options)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    reject(err);
                })
        })
    }
}