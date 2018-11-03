import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../config';

@Injectable()
export class UserProvider {

  public baseUrl = baseUrl;

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  createUser(userData) {
    return this.http.post(`${this.baseUrl}user/signup`, userData);
  }

  login(userData) {
    return this.http.post(`${this.baseUrl}user/login`, userData);
  }

}
