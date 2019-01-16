import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { environment } from "@env";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};
const BACKEND_URL = environment.backendUrl;

@Injectable({
  providedIn: "root"
})
export class DomainService {
  constructor(private http: HttpClient) {}

  getMembershipTypes() {
    return this.http.get(
      BACKEND_URL + "/domains/membership-types",
      httpOptions
    );
  }
}
