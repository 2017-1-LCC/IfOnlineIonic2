import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { JwtHelper } from "angular2-jwt";
import 'rxjs';

@Injectable()
export class ProfileService {

    baseUrl:string;
    typeUser:string;
    idUser:string;
    jwtHelper = new JwtHelper();

    constructor(public http:Http) {

    }

    loadProfile(token) {
        let headers = new Headers();
        headers.append('Authorization','Bearer '+token);

        let options = new RequestOptions({ headers: headers });

        this.typeUser = this.jwtHelper.decodeToken(token).typeUser;
        this.idUser = this.jwtHelper.decodeToken(token).idUser;

        if(this.typeUser === 'TEACHER') {
            this.baseUrl = 'https://ifonline.herokuapp.com/findteacherbyuser/'+this.idUser;
        } else {
            this.baseUrl = 'https://ifonline.herokuapp.com/findstudentbyuser/'+this.idUser;
        }
        return this.http.get(this.baseUrl, options)
            .map(res => res.json())
    }
}