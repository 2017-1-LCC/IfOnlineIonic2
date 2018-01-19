import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { JwtHelper } from "angular2-jwt";
import { SERVER_URL } from './config.service';
import 'rxjs';

let URL = SERVER_URL

@Injectable()
export class ProfileService {

    typeUser:string;
    idUser:string;
    jwtHelper = new JwtHelper();

    constructor(public http:Http) {  }

    loadProfile(token) {
        let headers = new Headers();
        headers.append('Authorization','Bearer '+token);

        let options = new RequestOptions({ headers: headers });

        this.typeUser = this.jwtHelper.decodeToken(token).typeUser;
        this.idUser = this.jwtHelper.decodeToken(token).idUser;

        if(this.typeUser === 'TEACHER') {
            URL = SERVER_URL+'findteacherbyuser/'+this.idUser;
        } else {
            URL = SERVER_URL+'findstudentbyuser/'+this.idUser;
        }
        return this.http.get(URL, options)
            .map(res => res.json())
    }

    getIdLoggedUser(token) {
        return this.jwtHelper.decodeToken(token).idUser;
    }

}