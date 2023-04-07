import type { Timestamp, AccessInterface, ID } from "./Shared";

export type Domain = {
  /**
   * ID
   */
  id: ID;
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

export const filterByName = (domains: Domain[], name: string): Domain => {
  const domainIndex = domains.findIndex((domain) => domain.name == name);
  return domains[domainIndex];
};
