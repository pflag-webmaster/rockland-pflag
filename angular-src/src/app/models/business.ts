import { Address } from "@models/address";

export class Business {
  businessName: string;
  businessPhoneNumber?: string;
  businessEmailAddress?: string;
  businessAddress?: Address;
  businessWebsite?: string;
}
