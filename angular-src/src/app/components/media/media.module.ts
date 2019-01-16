import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";

import { MediaComponent } from "./media.component";

@NgModule({
  declarations: [MediaComponent],
  imports: [CommonModule, SharedModule],
  providers: []
})
export class MediaModule {}
