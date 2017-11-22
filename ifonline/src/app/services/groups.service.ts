import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class GroupService {

  baseUrl:string;
  groups:any=[];

  constructor(public http:Http) {
    this.baseUrl = 'https://ifonline.herokuapp.com/';
  }

  updateGroup(token , data) {
    let headers = new Headers();
    headers.append('Authorization','Bearer '+token);
    headers.append('Accept','application/json');
    headers.append('Content-Type','application/json; charset=UTF-8');
    let options = new RequestOptions({ headers: headers });

    const group = JSON.stringify(data);

    return this.http.put(this.baseUrl+'studygroup/'+data._id, group, options)
            .map( res => res.json())
  }

  loadFullInformationGroup(token, idGroup) {  
    let headers = new Headers();
    headers.append('Authorization','Bearer '+token);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseUrl+'findallinfogroup/'+idGroup, options)
            .map(res => res.json())
  }

  loadGroups(token) {
    let headers = new Headers();
    headers.append('Authorization','Bearer '+token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.baseUrl+'studygroup', options)
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

    return this.http.post(this.baseUrl+'studygroup', group, options)
            .map( res => res.json())
  }

  addStudent(token, idStudent, idGroup) {
    let headers = new Headers();
    headers.append('Authorization','Bearer '+token);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl+'add/'+idStudent+'/ingroup/'+idGroup,null,options)
              .map( res => res.json())
  }

  removeStudent(token, idStudent, idGroup) {
    let headers = new Headers();
    headers.append('Authorization','Bearer '+token);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl+'remove/'+idStudent+'/ingroup/'+idGroup,null,options)
            .map( res => res.json())
  }

}