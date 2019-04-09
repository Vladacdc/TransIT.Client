import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {User} from '../models/user/user';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  constructor(private http: HttpClient) { }
  getRoleList() {
    return this.http.get(environment.apiUrl + '/Role' ).toPromise();
  }
  getUserList() {
    return this.http.get(environment.apiUrl + '/Users' ).toPromise();
  }
  // create
  putNewUser(user: User) {
    const body = {
        firstName: user.firstName,
        lastName: user.lastName,
        login: user.login,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role
    }
    return this.http.post( environment.apiUrl + '/User', body);
  }

}
