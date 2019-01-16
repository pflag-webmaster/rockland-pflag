import { Component, OnInit } from "@angular/core";

import { Title } from "@angular/platform-browser";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { map, filter, mergeMap } from "rxjs/operators";
import { DeviceDetectorService } from "ngx-device-detector";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "pf-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  pageTitle = "Rockland PFLAG";
  thisRoute = "";
  deviceInfo = null;
  ipAddress: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private http: HttpClient,
    private deviceService: DeviceDetectorService
  ) {
    router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = activatedRoute.firstChild;
          let child = route;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
              route = child;
            } else {
              child = null;
            }
          }
          this.thisRoute = route.routeConfig.path;
          return route;
        }),
        mergeMap(route => route.data)
      )
      .subscribe(data => {
        this.titleService.setTitle(data.title);
        this.http
          .get<{ ip: string }>("https://jsonip.com")
          .subscribe(ipData => {
            this.ipAddress = ipData.ip;
            this.getDeviceInfo(this.ipAddress, data.title, this.thisRoute);
          });
      });
  }

  ngOnInit() {}

  getDeviceInfo(ipAddress, title, routePath) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.deviceInfo.isMobile = this.deviceService.isMobile();
    this.deviceInfo.isTablet = this.deviceService.isTablet();
    this.deviceInfo.isDesktopDevice = this.deviceService.isDesktop();
    this.deviceInfo.ipAddress = ipAddress || "none found";
    this.deviceInfo.pageTitle = title || "none found";
    this.deviceInfo.routePath = routePath;
    //console.log(this.deviceInfo);
    //isMobile returns if the device is a mobile device (android / iPhone / windows-phone etc)
    //isTablet) returns if the device us a tablet (iPad etc)
    //isDesktopDevice  returns if the app is running on a Desktop browser.
  }
}
