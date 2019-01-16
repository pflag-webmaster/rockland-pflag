import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from "./components/about/about.component";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { MediaComponent } from "./components/media/media.component";
import { EventsComponent } from "./components/events/events.component";
import { SupportComponent } from "./components/support/support.component";
import { ContactComponent } from "./components/contact/contact.component";
import { VolunteerComponent } from "./components/volunteer/volunteer.component";
import { StoreComponent } from "./components/store/store.component";
import { MembershipComponent } from "./components/membership/membership.component";
import { MailingListComponent } from "./components/mailing-list/mailing-list.component";
import { DonateComponent } from "./components/donate/donate.component";
//import { LoginComponent } from "./components/login/login.component";
import { AdminComponent } from "./components/admin/admin.component";

const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    data: { title: "Rockland PFLAG Admin Area" }
  },
  /* {
    path: "login",
    component: LoginComponent,
    data: { title: "Rockland PFLAG Login/Register" }
  }, */
  {
    path: "about",
    component: AboutComponent,
    data: { title: "About Rockland PFLAG!" }
  },
  {
    path: "donate",
    component: DonateComponent,
    data: { title: "Donate to Rockland PFLAG" }
  },
  {
    path: "mailing-list",
    component: MailingListComponent,
    data: { title: "Rockland PFLAG Mailing List" }
  },
  {
    path: "membership",
    component: MembershipComponent,
    data: { title: "Rockland PFLAG Membership" }
  },
  {
    path: "calendar",
    component: CalendarComponent,
    data: { title: "Rockland PFLAG Calendar" }
  },
  {
    path: "media",
    component: MediaComponent,
    data: { title: "Rockland PFLAG Media" }
  },
  {
    path: "store",
    component: StoreComponent,
    data: { title: "Rockland PFLAG Store" }
  },
  {
    path: "support",
    component: SupportComponent,
    data: { title: "Safe Spaces/Support" }
  },
  {
    path: "events",
    component: EventsComponent,
    data: { title: "Rockland PFLAG Events" }
  },
  {
    path: "contact",
    component: ContactComponent,
    data: { title: "Contact Rockland PFLAG" }
  },
  {
    path: "volunteer",
    component: VolunteerComponent,
    data: { title: "Volunteer with Rockland PFLAG" }
  },
  // put in wildcard route to catch bad URL fragments
  { path: "", component: HomeComponent, data: { title: "Rockland PFLAG Home" } }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      anchorScrolling: "enabled"
    })
  ],
  // imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
