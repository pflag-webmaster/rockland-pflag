import { Address } from "./address";
import { EmailAddress } from "./emailAddress";
import { PhoneNumber } from "./phoneNumber";

export class Business {
  businessName: string;
  businessPhoneNumber?: PhoneNumber;
  businessEmailAddresses?: EmailAddress;
  membershipType: string;
  businessAddresses?: Address;
  businessWebsite?: string;
}
