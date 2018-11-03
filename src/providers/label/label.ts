import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../config';

@Injectable()
export class LabelProvider {

  public baseUrl = baseUrl;

  constructor(public http: HttpClient) {
    console.log('Hello LabelProvider Provider');
  }

  createLabel(labelData) {
    return this.http.post(`${this.baseUrl}category`, labelData);
  }

  editLabel(labelData) {
    return this.http.put(`${this.baseUrl}category`, labelData);
  }

  deleteLabel(labelData) {
    return this.http.delete(`${this.baseUrl}category/${labelData._id}`);
  }

}
