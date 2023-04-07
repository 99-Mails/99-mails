import { Domain } from "@/domains/Domain";
import { AccessInterface } from "@/domains/Shared";

export const INITIAL_DOMAIN: Domain = {
  id: "12345678",
  name: "Additional Address",
  availableVia: AccessInterface.WEB,
  introducedAt: "unknown",
};
