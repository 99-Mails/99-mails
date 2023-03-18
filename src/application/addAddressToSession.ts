import type { Domain } from "../domains/Domain";
import { useAddAddressToSession as API } from "../services/api";
import { useStore } from "../services/storeService";

function useAddAddressToSession() {
  const { sessionID: sessionId } = useStore();

  const [introduceAddress, { data: addressWithRestoreKey, error }] =
    API(sessionId);

  async function doAddAddressToSession(domain?: Domain) {
    try {
      await introduceAddress({
        variables: { input: { domainId: domain?.id, sessionId } },
      });
    } catch (e) {
      throw new Error(error?.message);
    }
  }

  return {
    doAddAddressToSession,
  };
}

export default useAddAddressToSession;
