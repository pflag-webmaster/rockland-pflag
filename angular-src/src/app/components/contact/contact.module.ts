import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";

import { ContactComponent } from "./contact.component";

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, SharedModule],
  providers: []
})
export class ContactModule {}
