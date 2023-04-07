import type { Domain } from "./Domain";
import type { Mail } from "./Mail";
import type { ID } from "./Shared";

export type Address = {
  id: ID;

  /**
   * Email address string <login>@<domain>
   */
  address: string;

  /**
   * <domain> part of .address.
   * Note: it's not domain name string! It's `Domain` object!
   */
  domain: Domain;

  /**
   * Key that can be used to restore the access to this address after session terminated.
   * See MutationRoot.restoreAddress
   */
  restoreKey: string;

  /**
   * List of all emails received by this address.
   * It's recommended to use Session.mails instead
   */
  mails: [Mail];
};

export type AddressID = Pick<Address, "address" | "id">;
