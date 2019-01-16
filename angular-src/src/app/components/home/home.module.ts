import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";

import { HomeComponent } from "./home.component";
import { BannerComponent } from "./banner/banner.component";
import { HighlightBoxComponent } from "./highlight-box/highlight-box.component";
import { WhatWeDoComponent } from "./what-we-do/what-we-do.component";
import { WhatsHappeningComponent } from "./whats-happening/whats-happening.component";

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    HighlightBoxComponent,
    WhatWeDoComponent,
    WhatsHappeningComponent
  ],
  imports: [CommonModule, SharedModule],
  providers: []
})
export class HomeModule {}
