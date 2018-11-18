import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { baseUrl } from "../config";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
interface familia {
  _id: string;
  name: string;
}
@Injectable()
export class FamilyProvider {
  public baseUrl = baseUrl;

  constructor(public http: HttpClient) {
    console.log("Hello AccountProvider Provider");
  }

  createFamily(familyData) {
    return this.http.post(`${this.baseUrl}family`, familyData);
  }

  getFamiliesByUserId(userId: string): any {
    const url = `${this.baseUrl}family/user/${userId}`;
    return this.http.get(url).map(res => {
      return res;
    });
  }
}
