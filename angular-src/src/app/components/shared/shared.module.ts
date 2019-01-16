import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NfpComponent } from "./nfp/nfp.component";
import { ColorStripeComponent } from "./color-stripe/color-stripe.component";

import { SmoothScrollDirective } from "../../directives/smooth-scroll.directive";
import { ComingSoonComponent } from "./coming-soon/coming-soon.component";

import {
  MatInputModule,
  MatFormFieldModule,
  MatIconModule
} from "@angular/material";

@NgModule({
  declarations: [
    NfpComponent,
    ColorStripeComponent,
    SmoothScrollDirective,
    ComingSoonComponent
  ],
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatIconModule],
  exports: [
    NfpComponent,
    ColorStripeComponent,
    SmoothScrollDirective,
    ComingSoonComponent,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule
  ],
  providers: []
})
export class SharedModule {}
