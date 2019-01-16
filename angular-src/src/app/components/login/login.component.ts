import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { DxFormComponent } from "devextreme-angular";
import notify from "devextreme/ui/notify";

import { Login } from "@models/login";

import { UserService } from "@services/user.service";
@Component({
  selector: "pf-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  /* @ViewChild(DxFormComponent) form: DxFormComponent;

  disableButton = false;

  emailPattern: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  buttonOptions: {
    text: string;
    type: string;
    useSubmitBehavior: boolean;
  } = {
    text: "Login",
    type: "success",
    useSubmitBehavior: true
  };

  login: Login = {
    email: "",
    password: ""
  };

  constructor(public userService: UserService, private router: Router) {}

  onFormSubmit = function(e) {
    const login: Login = {
      email: this.form.formData.email,
      password: this.form.formData.password
    };

    this.userService.login(login).subscribe(data => {
      console.log("in login component: ", data);
      this.disableButton = true;
      let displayTime = 3000;
      let displayType = "success";

      if (!data.success) {
        displayTime = 6000;
        displayType = "error";
        this.form.formData.email = "";
        this.disableButton = false;
      }

      notify(
        {
          message: data.message,
          position: {
            my: "center top",
            at: "center top"
          }
        },
        displayType,
        displayTime
      );
      if (data.success) {

        localStorage.clear()

        let localUser = JSON.parse(localStorage.getItem('user'))

        console.log('localUser, should be blank:', localUser)

        localStorage.setItem('user', JSON.stringify(user));
        setTimeout(() => {
          this.router.navigate(["/admin"]);
        }, 3000);
      }
    });

    e.preventDefault();
  }; */
}
