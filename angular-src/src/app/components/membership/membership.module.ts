import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "../shared/shared.module";
import { MembershipComponent } from "./membership.component";

@NgModule({
  declarations: [MembershipComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  providers: []
})
export class MembershipModule {}
