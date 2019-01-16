import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";

import { VolunteerComponent } from "./volunteer.component";

@NgModule({
  declarations: [VolunteerComponent],
  imports: [CommonModule, SharedModule],
  providers: []
})
export class VolunteerModule {}
