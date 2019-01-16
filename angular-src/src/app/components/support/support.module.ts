import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";

import { SupportComponent } from "./support.component";

@NgModule({
  declarations: [SupportComponent],
  imports: [CommonModule, SharedModule],
  providers: []
})
export class SupportModule {}
