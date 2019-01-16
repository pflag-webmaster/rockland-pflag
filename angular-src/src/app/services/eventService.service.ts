import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { environment } from "@env";

const BACKEND_URL = environment.backendUrl;

@Injectable({
  providedIn: "root"
})
export class EventService {
  constructor(private http: HttpClient) {}

  public eventsBS = new BehaviorSubject<Object>(null);

  getEvents() {
    return this.http.get(BACKEND_URL + "/events/getAllEvents");
  }
}
