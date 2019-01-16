import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";

import { MailingListComponent } from "./mailing-list.component";

@NgModule({
  declarations: [MailingListComponent],
  imports: [CommonModule, SharedModule],
  providers: []
})
export class MailingListModule {}
