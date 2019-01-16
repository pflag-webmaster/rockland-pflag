import { Name } from "./name";
import { Address } from "./address";
import { EmailAddress } from "./emailAddress";
import { PhoneNumber } from "./phoneNumber";

export class Membership {
  names: Name[];
  phoneNumbers: PhoneNumber[];
  emailAddresses: EmailAddress[];
  membershipType: string;
  otherDonation: string;
  addresses: Address[];
}
