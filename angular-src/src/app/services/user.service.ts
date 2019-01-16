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
export class UserService {
  constructor(private http: HttpClient) {}

  login(login) {
    return this.http.post(BACKEND_URL + "/users/login", login, httpOptions);
  }

  /* 
  registerUser(user) {
    var results = this.http.post(
      "http://localhost:3000/users/registerUser",
      user
    );

    console.log("Register: ", results);

    return results;
  } */
}
