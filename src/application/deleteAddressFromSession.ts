import type { AddressID } from "@/domains/Address";
import { useDeleteAddress } from "@/services/api";
import { useTempEmail } from "@/services/tempEmailAdaptor";
import { useNotifier } from "@/services/notificationAdaptor";
import { AlertDialogService, NotificationService } from "./ports";
import { useAlertDialog } from "@/services/alertDialog";

function useDeleteAddressFromSession() {
  const notifier: NotificationService = useNotifier();
  const { openDialog, signal, ...dialog }: AlertDialogService =
    useAlertDialog();
  const { sessionID: sessionId } = useTempEmail();

  const [deleteAddress, { data: apiData, loading: apiLoading, error, called }] =
    useDeleteAddress(sessionId, signal);

  // TODO: fix console error
  // Uncaught (in promise) Error
  // at doDeleteAddress (deleteAddressFromSession.ts:21:13)
  //
  // TODO: refactor this use-case
  // TODO: add notification whether it passes or not
  // TODO: Uncaught (in promise) Error: ApolloError: invalid_id
  // TODO: Uncaught (in promise) TypeError: Cannot read properties
  // of undefined (reading 'deleteAddress
  //
  // TODO: async loading status for delete button on dialog ✅
  // TODO: code-smell
  // TODO: implement abort-controller with timeout for dialog
  async function doDeleteAddress(address: AddressID) {
    const action = await openDialog({
      body: "Are you sure?",
      header: "Delete Address",
    });

    if (action) {
      dialog.isLoading();

      try {
        let response = await deleteAddress({
          variables: { input: { addressId: address.id } },
        });

        const isDeleted = response.data.deleteAddress;

        if (isDeleted) {
          dialog.closeDialog();
          notifier.notifySuccess("Done.", "Address succesfully removed.");
        } else {
          dialog.closeDialog();
          notifier.notifyError(
            "Failed.",
            "Couldn't remove the address, try later!"
          );
        }
      } catch (e: any) {
        throw new Error(e, {});
      }
    } else {
      dialog.closeDialog();
    }
  }

  return {
    doDeleteAddress,
  };
}

export default useDeleteAddressFromSession;
