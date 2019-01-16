import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";

import { DonateComponent } from "./donate.component";

@NgModule({
  declarations: [DonateComponent],
  imports: [CommonModule, SharedModule],
  providers: []
})
export class DonateModule {}
