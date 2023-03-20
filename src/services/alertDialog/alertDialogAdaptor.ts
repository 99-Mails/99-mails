import { useContext, useState } from "react";
import { AlertDialogService } from "../../application/ports";
import { DialogContext } from "./alertDialog";

// TODO: codesmells
// TODO: fix typing - should enable strict mode asap
// TODO: implement async loading for affirmative button pass ✅
export function useAlertDialog(): AlertDialogService {
  const alert = useContext(DialogContext);

  const openDialog = (arg) => alert.getConfirmation(arg);

  const isLoading = () => alert.setButtonLoading(true);
  const stopLoading = () => alert.setButtonLoading(false);

  const closeDialog = () => {
    alert.setHeader("");
    alert.setBody("");
    alert.setButtonLoading(false);
    alert.onClose();
  };

  return {
    openDialog,
    closeDialog,
    isLoading,
    stopLoading,
  };
}
