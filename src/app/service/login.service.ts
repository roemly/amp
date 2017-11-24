import { Injectable } from '@angular/core';
import {User} from '../class/User';
import {USERS} from './user-data';
import {getResponseURL} from '@angular/http/src/http_utils';
import {Http} from '@angular/http';

@Injectable()
export class LoginService {
  private user: User = null;
  private url = 'http://ptamp.aindo.com/api-login.php';
  constructor(private http: Http) {
    if (localStorage.user !== undefined){
      this.user = JSON.parse(localStorage.user) as User;
    }
  }

  attempt (username: string, password: string): Boolean {
    //call an api to authenticate
    let flag = false;
    this.http.post(this.url, {username : username, password: password}).toPromise()
        .then(response => {
          console.log(response);
          flag = true;
        })
        .catch(response => {
          console.log(response);
        });
    return flag;
  }

  changePassword (new_password: string) {
      this.user.token = new_password;
      localStorage.user = JSON.stringify(this.user);
  }
  getUserCurrent(): User {
    return this.user;
  }
  isLogin(): Boolean {
    return this.user !== null;
  }

  logout(): void {
    localStorage.user = null;
    this.user = null;
  }
  getUserData(): void {
      console.log(this.user.name);
      console.log(this.user.alamat);
      console.log(this.user.email);
      console.log(this.user.telp);
  }
}
