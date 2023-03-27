export interface NotificationService {
  notifySuccess(title: string, description: string): void;
  notifyError(title: string, description: string): void;
}

export interface APIService {
  useCreateEmptySession: Fn;
  useGetSession: Fn;
  useCreateSessionWithRandomAddress: Fn;
  useListSessionsWithMails: Fn;
  useAddAddressToSession: Fn;
  useGetAddressWithSession: Fn;
  useListDomains: Fn;
  useFetchIncomingEmails: Fn;
  useDeleteAddress: Fn;
}

export interface AlertDialogService {
  openDialog: Fn;
  closeDialog: Fn;
  cancelDialog: Fn;
  isLoading: Fn;
  stopLoading: Fn;
  signal: AbortSignal;
}
