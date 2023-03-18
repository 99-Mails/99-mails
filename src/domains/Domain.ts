import type { Timestamp, AccessInterface } from "./Shared";

export type Domain = {
  /**
   * ID
   */
  id: string;
  /**
   * Fully-qualified domain name
   */
  name: string;
  /**
   * Timestamp of when this domain was first introduced in dropmail.me (how old is this domain)
   */
  introducedAt: Timestamp;
  /**
   * List of interfaces the domain is available through.
   * When domain is not available via some interface, it means `Address` can not be created or restored
   * via this interface.
   */
  availableVia: AccessInterface;
};
