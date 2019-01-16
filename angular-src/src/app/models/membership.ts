import { FamilyMember } from "@models/familyMember";

export interface Membership {
  address: string;
  additionalDonation: string;
  businessAddress: string;
  businessCity: string;
  businessName: string;
  businessOther: string;
  businessPhone: string;
  businessState: string;
  city: string;
  email: string;
  familyMembers: FamilyMember[];
  firstName: string;
  homePhone: string;
  lastName: string;
  membershipType: string;
  mobilePhone: string;
  ofAge: boolean;
  other: string;
  otherPhone: string;
  postalCode: string;
  state: string;
  website: string;
}
