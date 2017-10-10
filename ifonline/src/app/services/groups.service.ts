import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class GroupService {
  http:any;
  baseUrl:string;

  construtor(http:Http) {
    this.http = http;
    this.baseUrl = 'http://darkSide:3000/';
  }

  getAllGroups() {
    return this.http.get(this.baseUrl+'studygroup')
      .map(res => res.json());
  }
}