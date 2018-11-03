import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../config';

@Injectable()
export class FamilyProvider {

  public baseUrl = baseUrl;

  constructor(public http: HttpClient) {
    console.log('Hello AccountProvider Provider');
  }

  createFamily(familyData) {
    return this.http.post(`${this.baseUrl}family`, familyData);
  }

  getFamiliesByUserId(userId) {
    return this.http.get(`${this.baseUrl}family/user/${userId}`);
  }

}
