import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../config';

@Injectable()
export class CategoryProvider {

  public baseUrl = baseUrl;

  constructor(public http: HttpClient) {
    console.log('Hello CategoryProvider Provider');
  }

  createCategory(categoryData) {
    return this.http.post(`${this.baseUrl}spendgroup`, categoryData);
  }

  deleteCategory(categoryData) {
    return this.http.delete(`${this.baseUrl}spendgroup/${categoryData._id}`);
  }

  editCategory(categoryData) {
    return this.http.put(`${this.baseUrl}spendgroup`, categoryData);
  }

}
