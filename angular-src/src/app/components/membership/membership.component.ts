import { Component, OnInit, ɵConsole } from "@angular/core";
import { Router } from "@angular/router";

import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";

import notify from "devextreme/ui/notify";

import { MembershipService } from "@services/membership.service";
import { DomainService } from "@services/domain.service";

@Component({
  selector: "pf-membership",
  templateUrl: "./membership.component.html",
  styleUrls: ["./membership.component.scss"]
})
export class MembershipComponent implements OnInit {
  membershipForm: FormGroup;
  familyMembersList: FormArray;

  states = this.getStateList();
  origMembershipType;
  membershipType;
  membershipTypes;

  todayDate = new Date(); //"Tuesday January 1, 2019";

  zips = require("zips");

  emailExists: Boolean = false;

  errors = [];
  displayErrors = {};
  displayErrorsList = [];
  errorMessages = {
    membershipType: { required: "Please select a PFLAG Membership Type." },
    lastName: { required: "Please enter the member's last name." },
    firstName: { required: "Please enter the member's last name." },
    ofAge: {
      required:
        "All members of PFLAG must 18 or older. Please confirm that the member is 18 or older."
    },
    email: {
      required: "Please enter the member's last name.",
      email: "Emails must be a valid format for email addresses."
    },
    postalCode: { pattern: "Zip codes must 5 digits only. (e.g. 02134)" },
    familyMemberFirstName: {
      required: "Please enter all family members' first names."
    },
    familyMemberLastName: {
      required: "Please enter all family members' last names."
    },
    familyMemberEmail: {
      required: "Please enter the member's last name.",
      email: "Emails must be a valid format for email addresses."
    },
    familyMemberOfAge: {
      required:
        "All members of PFLAG must 18 or older. Please confirm that the family member is 18 or older."
    },
    businessName: { required: "Please enter the name of the business." },
    businessPostalCode: {
      pattern: "Zip codes must 5 digits only. (e.g. 02134)"
    }
  };

  formValid: Boolean = false;

  constructor(
    private domainService: DomainService,
    private membershipService: MembershipService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.domainService.getMembershipTypes().subscribe(results => {
      this.membershipTypes = results;
    });
  }

  newEmail() {
    console.log("focus on email");
    this.emailExists = false;
  }

  checkEmail() {
    var value = this.membershipForm.get("email").value;
    var status = this.membershipForm.get("email").valid;

    if (status === true) {
      this.membershipService.checkEmail(value).subscribe(exists => {
        console.log("checkEmail: ", value, status, exists);
        if (exists) {
          this.emailExists = true;
          this.membershipForm.get("email").setValue("");
        }
      });
    }
  }

  ngOnInit() {
    this.membershipForm = this.fb.group({
      membershipType: [null, [Validators.required]],
      additionalDonation: [null],
      businessName: [null],
      businessPhone: [null],
      website: [null],
      businessAddress: [null],
      businessOther: [null],
      businessPostalCode: [null],
      businessCity: [null],
      businessState: [null],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      ofAge: [null, [Validators.requiredTrue]],
      familyMembers: this.fb.array([]),
      address: [null],
      other: [null],
      city: [null],
      state: [null],
      postalCode: [null, [Validators.pattern(/^\d{5}/)]],
      homePhone: [null],
      mobilePhone: [null],
      otherPhone: [null],
      email: [null, [Validators.required, Validators.email]]
    });

    this.membershipForm
      .get("postalCode")
      .valueChanges.subscribe((code: string) => {
        var regex = /^\d{5}$/;
        if (regex.test(code)) {
          var locationInfo = this.zips.getByZipCode(code);
          if (locationInfo !== null) {
            this.membershipForm.get("city").setValue(locationInfo.city);
            this.membershipForm.get("state").setValue(locationInfo.state);
          }
        }
      });

    this.membershipForm
      .get("membershipType")
      .valueChanges.subscribe((type: string) => {
        this.origMembershipType = this.membershipType;
        if (
          type !== "business" &&
          type !== "businessPremium" &&
          (this.origMembershipType === "business" ||
            this.origMembershipType === "businessPremium")
        ) {
          this.removeBusinessSection();
        }

        if (
          (type === "business" || type === "businessPremium") &&
          this.origMembershipType !== "business" &&
          this.origMembershipType !== "businessPremium"
        ) {
          this.addBusinessSection();

          /* this.membershipForm
            .get("businessName")
            .valueChanges.subscribe((name: string) => {
              console.log("businessName: ", name);
            }); */

          this.membershipForm
            .get("businessPostalCode")
            .valueChanges.subscribe((code: string) => {
              var regex = /^\d{5}$/;
              if (regex.test(code)) {
                var locationInfo = this.zips.getByZipCode(code);
                if (locationInfo !== null) {
                  this.membershipForm
                    .get("businessCity")
                    .setValue(locationInfo.city);
                  this.membershipForm
                    .get("businessState")
                    .setValue(locationInfo.state);
                }
              }
            });
        }

        if (type !== "family") {
          this.removeFamilySection();
        }

        if (type === "family") {
          this.addFamilyMember(1);
        }

        this.membershipType = type;
      });
  }

  onReset() {
    this.membershipForm.reset();
  }

  onSubmit() {
    this.errors = [];
    this.markControlsDirty(this.membershipForm);

    if (this.errors.length === 0) {
      this.formValid = true;

      console.log(this.membershipForm.value);

      this.membershipService
        .addMembership(this.membershipForm.value)
        .subscribe(result => {
          console.log(result);

          this.membershipForm.reset();

          // Redirect
        });
    } else {
      this.displayErrors = {};
      this.displayErrorsList = [];
      this.errors.forEach(error => {
        this.displayErrors[error.keyControl] = this.errorMessages[
          error.keyControl
        ][error.keyError];
      });

      for (var error in this.displayErrors) {
        this.displayErrorsList.push(this.displayErrors[error]);
      }
    }
  }

  markControlsDirty(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.controls[key];

      if (
        abstractControl instanceof FormGroup ||
        abstractControl instanceof FormArray
      ) {
        this.markControlsDirty(abstractControl);
      } else {
        abstractControl.markAsDirty();
        const controlErrors = abstractControl.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            this.errors.push({
              keyControl: key,
              keyError: keyError,
              errValue: controlErrors[keyError]
            });
          });
        }
      }
    });
  }

  createFamilyMember(): FormGroup {
    return this.fb.group({
      familyMemberFirstName: [null, Validators.required],
      familyMemberLastName: [null, Validators.required],
      familyMemberPhoneNumber: [null],
      familyMemberEmail: [null, Validators.email],
      familyMemberOfAge: [null, Validators.requiredTrue]
    });
  }

  // returns all form groups under contacts
  get familyMembersFormGroup() {
    return this.membershipForm.get("familyMembers") as FormArray;
  }
  getFamilyMembersFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    this.familyMembersList = this.membershipForm.get(
      "familyMembers"
    ) as FormArray;
    const formGroup = this.familyMembersList.controls[index] as FormGroup;
    return formGroup;
  }

  addFamilyMember(remove) {
    this.familyMembersList = this.membershipForm.get(
      "familyMembers"
    ) as FormArray;

    this.familyMembersList.push(this.createFamilyMember());
    if (remove) {
      while (this.familyMembersList.length > 1) {
        this.familyMembersList.removeAt(1);
      }
    }
  }

  deleteFamilyMember(index) {
    this.familyMembersList = this.membershipForm.get(
      "familyMembers"
    ) as FormArray;
    this.familyMembersList.removeAt(index);
  }

  removeFamilySection() {
    this.familyMembersList = this.membershipForm.get(
      "familyMembers"
    ) as FormArray;
    this.familyMembersList = this.fb.array([]);
  }

  addBusinessSection() {
    this.membershipForm.controls["businessName"].setValidators([
      Validators.required
    ]);
    this.membershipForm.get("businessName").updateValueAndValidity();
    this.membershipForm.controls["businessPostalCode"].setValidators([
      Validators.pattern(/^\d{5}/)
    ]);
    this.membershipForm.get("businessPostalCode").updateValueAndValidity();
  }

  removeBusinessSection() {
    this.membershipForm.controls["businessName"].clearValidators();
    this.membershipForm.get("businessName").updateValueAndValidity();
    this.membershipForm.controls["businessPostalCode"].clearValidators();
    this.membershipForm.get("businessPostalCode").updateValueAndValidity();
  }

  showForm() {
    console.log(this.membershipForm);
  }

  get f() {
    return this.membershipForm.controls;
  }

  getStateList() {
    return [
      "NY",
      "AL",
      "AK",
      "AZ",
      "AR",
      "CA",
      "CO",
      "CT",
      "DE",
      "DC",
      "FL",
      "GA",
      "HI",
      "ID",
      "IL",
      "IN",
      "IA",
      "KS",
      "KY",
      "LA",
      "ME",
      "MD",
      "MA",
      "MI",
      "MN",
      "MS",
      "MO",
      "MT",
      "NE",
      "NV",
      "NH",
      "NJ",
      "NM",
      "NY",
      "NC",
      "ND",
      "OH",
      "OK",
      "OR",
      "PA",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VT",
      "VA",
      "WA",
      "WV",
      "WI",
      "WY"
    ];
  }
}

/* 
membership: Membership = {
  membershipType: "businessPremium",
  names: [
    {
      firstName: "Jerry",
      lastName: "Smith"
    },
    {
      firstName: "Donna",
      lastName: "Smith"
    },
    {
      firstName: "Billy",
      lastName: "Smith"
    },
    {
      firstName: "Phil",
      lastName: "Smith"
    }
  ],
  address: {
    addressLine1: "123 Main St",
    addressLine2: "Aapt 4",
    city: "Nyack",
    state: "NY",
    postalCode: "10956"
  },
  homePhone: "123-456-7890",
  mobilePhone: "123-456-7890",
  otherPhone: "123-456-7890",
  emailAddress: "bob.smith@test.com",
  additionalDonation: "123.45",
  business: {
    businessName: "Luken Consulting",
    businessPhoneNumber: "2121234567",
    businessEmailAddress: "dennis@lukenconsulting.com",
    businessWebsite: "www.lukenconsulting.com",
    businessAddress: {
      addressLine1: "123 Main St",
      addressLine2: "Aapt 4",
      city: "Nyack",
      state: "NY",
      postalCode: "10956"
    }
  }
}; */
