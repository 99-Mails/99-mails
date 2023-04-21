import type { Domain } from "@/domains/domain";
import { useAddAddressToSession as API } from "@/services/api";
import { useTempEmail } from "@/services/tempEmailAdaptor";

function useAddAddressToSession() {
  const { sessionID: sessionId } = useTempEmail();

  const [introduceAddress, { data: addressWithRestoreKey, loading, error }] =
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
    isAddingAddress: loading,
  };
}

export default useAddAddressToSession;
