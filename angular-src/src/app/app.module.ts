import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { DeviceDetectorModule } from "ngx-device-detector";

import { MatFormFieldModule } from "@angular/material/form-field";

import { AppRoutingModule } from "./app-routing.module";

import { HomeModule } from "./components/home/home.module";
import { AboutModule } from "./components/about/about.module";
import { CalendarModule } from "./components/calendar/calendar.module";
import { MediaModule } from "./components/media/media.module";
import { StoreModule } from "./components/store/store.module";
import { SupportModule } from "./components/support/support.module";
import { EventsModule } from "./components/events/events.module";
import { ContactModule } from "./components/contact/contact.module";
import { VolunteerModule } from "./components/volunteer/volunteer.module";
import { MembershipModule } from "./components/membership/membership.module";
import { MailingListModule } from "./components/mailing-list/mailing-list.module";
import { DonateModule } from "./components/donate/donate.module";
//import { LoginModule } from "./components/login/login.module";
import { AdminModule } from "./components/admin/admin.module";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    DeviceDetectorModule.forRoot(),
    MatFormFieldModule,
    HomeModule,
    AboutModule,
    CalendarModule,
    MediaModule,
    StoreModule,
    EventsModule,
    ContactModule,
    SupportModule,
    VolunteerModule,
    MembershipModule,
    MailingListModule,
    DonateModule,
    //LoginModule,
    AdminModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
