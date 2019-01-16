import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { environment } from "@env";
import { Membership } from "@app/models/membership";

let httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

const headers = new HttpHeaders().set("Content-Type", "application/json");

const BACKEND_URL = environment.backendUrl;

@Injectable({
  providedIn: "root"
})
export class MembershipService {
  constructor(private http: HttpClient) {}

  addMembership(membership: Membership) {
    console.log(membership);

    return this.http.post(
      BACKEND_URL + "/memberships/add",
      membership,
      httpOptions
    );
  }

  checkEmail(email: string) {
    console.log(email);

    const params: any = { email: email };
    const httpParams: HttpParamsOptions = {
      fromObject: params
    } as HttpParamsOptions;

    const options = { params: new HttpParams(httpParams), headers: headers };

    console.log(options);

    return this.http.get(BACKEND_URL + "/memberships/check-email", options);
  }
}

export interface HttpParameterCodec {
  encodeKey(key: string): string;
  encodeValue(value: string): string;

  decodeKey(key: string): string;
  decodeValue(value: string): string;
}

/** Options used to construct an `HttpParams` instance. */
export interface HttpParamsOptions {
  /**
   * String representation of the HTTP params in URL-query-string format. Mutually exclusive with
   * `fromObject`.
   */
  fromString?: string;

  /** Object map of the HTTP params. Mutally exclusive with `fromString`. */
  fromObject?: { [param: string]: string | string[] };

  /** Encoding codec used to parse and serialize the params. */
  encoder?: HttpParameterCodec;
}
