import { Domain } from "@/domains/domain";
import { AccessInterface } from "@/types";

export const INITIAL_DOMAIN: Domain = {
  id: "12345678",
  name: "Additional Address",
  availableVia: AccessInterface.WEB,
  introducedAt: "unknown",
};
