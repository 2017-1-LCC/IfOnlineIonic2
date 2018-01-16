import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { SERVER_URL } from './config.service'; 
import 'rxjs/Rx';

let URL = SERVER_URL + 'timeline';

@Injectable()
export class TimelineService {

  constructor(public http:Http) {}

  loadTimeline(token) {
    let headers = new Headers();
    headers.append('Authorization','Bearer '+token);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL, options)
            .map(res => res.json())
  }
}