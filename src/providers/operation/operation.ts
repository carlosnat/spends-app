import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../config';

@Injectable()
export class OperationProvider {

  public baseUrl = baseUrl;

  constructor(public http: HttpClient) {
    console.log('Hello OperationProvider Provider');
  }

  createOperation(accountData) {
    return this.http.post(`${this.baseUrl}operation`, accountData);
  }

  uploadOperationImage(image) {
    return this.http.post(`${this.baseUrl}operation/upload`, image);
  }

  getAllByFamilyId(idFamily) {
    return this.http.get(`${this.baseUrl}operation/family/${idFamily}`);
  }

}
