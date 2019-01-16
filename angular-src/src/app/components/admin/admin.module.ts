import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";

import { AdminComponent } from "./admin.component";

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, SharedModule],
  providers: []
})
export class AdminModule {}