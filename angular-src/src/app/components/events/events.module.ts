import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";

import { EventsComponent } from "./events.component";

@NgModule({
  declarations: [EventsComponent],
  imports: [CommonModule, SharedModule],
  providers: []
})
export class EventsModule {}
