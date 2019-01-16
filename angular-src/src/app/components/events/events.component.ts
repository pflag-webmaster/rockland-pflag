import { Component, OnInit } from "@angular/core";
import { EventService } from "../../services/eventService.service";

@Component({
  selector: "pf-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"]
})
export class EventsComponent implements OnInit {
  constructor(private eventService: EventService) {}

  ngOnInit() {}
}
