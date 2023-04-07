import { useContext } from "react";
import { AlertDialogService } from "@/application/ports";
import { DialogContext } from "./alertDialogContext";

// TODO: codesmells
// TODO: fix typing - should enable strict mode asap
// TODO: implement async loading for affirmative button pass ✅
export function useAlertDialog(): AlertDialogService {
  const alert = useContext(DialogContext);

  function closeDialog() {
    alert.setHeader("");
    alert.setBody("");
    alert.setButtonLoading(false);
    alert.onClose();
  }

  return {
    closeDialog,
    openDialog: (arg) => alert.getConfirmation(arg),
    cancelDialog: () => alert.onCancel(),
    isLoading: () => alert.setButtonLoading(true),
    stopLoading: () => alert.setButtonLoading(false),
    signal: alert.signal,
  };
}
