import { NotificationService } from "../application/ports";
import { useToast } from "@chakra-ui/react";

// TODO: codesmells
export function useNotifier(): NotificationService {
  const toast = useToast();

  const SuccessNotification = (title: string, description: string) => {
    toast({
      title: title,
      description: description,
      status: "success",
      duration: 3000,
      containerStyle: {
        backgroundColor: "green",
      },
    });
  };

  const ErrorNotification = (title: string, description: string) => {
    toast({
      title: title,
      description: description,
      status: "error",
      duration: 3000,
      containerStyle: {
        backgroundColor: "red",
      },
    });
  };

  return {
    notifySuccess: SuccessNotification,
    notifyError: ErrorNotification,
  };
}
