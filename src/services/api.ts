import { useQuery, useMutation, gql } from "@apollo/client";

import getSession from "./queries/getSession.graphql?raw";
import listDomains from "./queries/listDomains.graphql?raw";
import listSessionsWithMails from "./queries/listSessionsWithMails.graphql?raw";
import createEmptySession from "./queries/createEmptySession.graphql?raw";
import fetchIncomingEmails from "./queries/fetchIncomingEmail.graphql?raw";
import createSessionWithRandomAddress from "./queries/createSessionWithRandomAddress.graphql?raw";
import addAddressToSession from "./queries/addAddressToSession.graphql?raw";
import getAddressWithSession from "./queries/getAddressWithSession.graphql?raw";
import deleteAddress from "./queries/deleteAddress.graphql?raw";

const GET_SESSION = gql(getSession);
const LIST_DOMAINS = gql(listDomains);
const LIST_SESSIONS_WITH_MAILS = gql(listSessionsWithMails);
const CREATE_EMPTY_SESSION = gql(createEmptySession);
const CREATE_SESSION_WITH_RANDOM_ADDRESS = gql(createSessionWithRandomAddress);
const FETCH_INCOMING_EMAILS = gql(fetchIncomingEmails);
const ADD_ADDRESS_TO_SESSION = gql(addAddressToSession);
const GET_ADDRESS_WITH_SESSION = gql(getAddressWithSession);
const DELETE_ADDRESS = gql(deleteAddress);

const useCreateEmptySession = () => useQuery(CREATE_EMPTY_SESSION);

const useGetSession = (id: string) =>
  useQuery(GET_SESSION, { variables: { id } });

const useCreateSessionWithRandomAddress = () =>
  useMutation(CREATE_SESSION_WITH_RANDOM_ADDRESS);

const useListSessionsWithMails = () => useQuery(LIST_SESSIONS_WITH_MAILS);

const useAddAddressToSession = (sessionId: string) =>
  useMutation(ADD_ADDRESS_TO_SESSION, {
    refetchQueries: [
      { query: GET_ADDRESS_WITH_SESSION, variables: { id: sessionId } },
    ],
  });

const useGetAddressWithSession = (id: string) =>
  useQuery(GET_ADDRESS_WITH_SESSION, { variables: { id } });

const useListDomains = () => useQuery(LIST_DOMAINS);

const useDeleteAddress = (sessionId: string, signal: AbortSignal) =>
  useMutation(DELETE_ADDRESS, {
    refetchQueries: [
      { query: GET_ADDRESS_WITH_SESSION, variables: { id: sessionId } },
    ],
    context: {
      fetchOptions: {
        get signal() {
          return signal;
        },
      },
    },
  });

const useFetchIncomingEmails = (id: string) =>
  useQuery(FETCH_INCOMING_EMAILS, { variables: { id }, pollInterval: 10000 });

export {
  useCreateEmptySession,
  useGetSession,
  useCreateSessionWithRandomAddress,
  useListSessionsWithMails,
  useAddAddressToSession,
  useGetAddressWithSession,
  useListDomains,
  useFetchIncomingEmails,
  useDeleteAddress,
};
