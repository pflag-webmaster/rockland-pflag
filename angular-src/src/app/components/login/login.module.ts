import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxNumberBoxModule,
  DxButtonModule,
  DxFormModule,
  DxAutocompleteModule,
  DxAccordionModule
} from "devextreme-angular";

import { SharedModule } from "../shared/shared.module";

//import { LoginComponent } from "./login.component";

@NgModule({
  //declarations: [LoginComponent],
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxButtonModule,
    DxFormModule,
    DxAutocompleteModule,
    DxAccordionModule
  ],
  providers: []
})
export class LoginModule {}
