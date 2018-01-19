import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { SERVER_URL } from './config.service';
import 'rxjs/Rx';

let URL = SERVER_URL

@Injectable()
export class GroupService {

  baseUrl:string;
  groups:any=[];

  constructor(public http:Http) { }

  updateGroup(token , data) {
    let headers = new Headers();
    headers.append('Authorization','Bearer '+token);
    headers.append('Accept','application/json');
    headers.append('Content-Type','application/json; charset=UTF-8');
    let options = new RequestOptions({ headers: headers });

    const group = JSON.stringify(data);

    return this.http.put(URL+'studygroup/'+data._id, group, options)
            .map( res => res.json())
  }

  loadFullInformationGroup(token, idGroup) {  
    let headers = new Headers();
    headers.append('Authorization','Bearer '+token);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL+'findallinfogroup/'+idGroup, options)
            .map(res => res.json())
  }

  loadGroups(token) {
    let headers = new Headers();
    headers.append('Authorization','Bearer '+token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(URL+'studygroup', options)
              .map(res => {
                this.groups = res.json();
                return res.json()
              })
  }

  filterGroups(searchTerm) {
    return this.groups.filter((group) => {
      return group.discipline.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  createGroup(token, data) {
    let headers = new Headers();
    headers.append('Authorization','Bearer '+token);
    headers.append('Accept','application/json');
    headers.append('Content-Type','application/json; charset=UTF-8');
    let options = new RequestOptions({ headers: headers });

    const group = JSON.stringify(data);

    return this.http.post(URL+'studygroup', group, options)
            .map( res => res.json())
  }

  addComment(token, data, idGroup) {
    let headers = new Headers();
    headers.append('Authorization','Bearer '+token);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(URL+'addComment/'+idGroup,data,options)
              .map( res => res.json())
  }

  removeComment(token, idComment, idGroup) {
    let headers = new Headers();
    headers.append('Authorization','Bearer '+token);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(URL+'remove/'+idGroup+'/comment/'+idComment,null,options)
            .map( res => res.json())
  }

  addStudent(token, idStudent, idGroup) {
    let headers = new Headers();
    headers.append('Authorization','Bearer '+token);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(URL+'add/'+idStudent+'/ingroup/'+idGroup,null,options)
              .map( res => res.json())
  }

  removeStudent(token, idStudent, idGroup) {
    let headers = new Headers();
    headers.append('Authorization','Bearer '+token);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(URL+'remove/'+idStudent+'/ingroup/'+idGroup,null,options)
            .map( res => res.json())
  }

}