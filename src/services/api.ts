import { useQuery, useMutation, gql } from "@apollo/client";
import getSession from "./queries/getSession.graphql?raw";
import listDomains from "./queries/listDomains.graphql?raw";
import listSessionsWithMails from "./queries/listSessionsWithMails.graphql?raw";
import createEmptySession from "./queries/createEmptySession.graphql?raw";
import fetchIncomingEmails from "./queries/fetchIncomingEmail.graphql?raw";
import createSessionWithRandomAddress from "./queries/createSessionWithRandomAddress.graphql?raw";
import addAddressToSession from "./queries/addAddressToSession.graphql?raw";
import getAddressWithSession from "./queries/getAddressWithSession.graphql?raw";

const GET_SESSION = gql(getSession);
const LIST_DOMAINS = gql(listDomains);
const LIST_SESSIONS_WITH_MAILS = gql(listSessionsWithMails);
const CREATE_EMPTY_SESSION = gql(createEmptySession);
const CREATE_SESSION_WITH_RANDOM_ADDRESS = gql(createSessionWithRandomAddress);
const FETCH_INCOMING_EMAILS = gql(fetchIncomingEmails);
const ADD_ADDRESS_TO_SESSION = gql(addAddressToSession);
const GET_ADDRESS_WITH_SESSION = gql(getAddressWithSession);

const useSession = () => {
  const getSession = (id: string) => {
    useQuery(GET_SESSION, {
      variables: {
        id,
      },
    });
  };

  const createEmptySession = () => useQuery(CREATE_EMPTY_SESSION);

  const createSessionWithRandomAddress = () =>
    useMutation(CREATE_SESSION_WITH_RANDOM_ADDRESS);

  const listSessionsWithMails = () => useQuery(LIST_SESSIONS_WITH_MAILS);

  const addAddressToSession = ({ sessionId }) =>
    useMutation(ADD_ADDRESS_TO_SESSION, {
      refetchQueries: [{ query: GET_ADDRESS_WITH_SESSION, variables: { id: sessionId } }],
    });

  const getAddressWithSession = (id: string) =>
    useQuery(GET_ADDRESS_WITH_SESSION, {
      variables: {
        id,
      },
    });

  return {
    getSession,
    listSessionsWithMails,
    createEmptySession,
    createSessionWithRandomAddress,
    addAddressToSession,
    getAddressWithSession,
  };
};

const useDomain = () => {
  const listDomains = () => useQuery(LIST_DOMAINS);
  return {
    listDomains,
  };
};

const useEmail = () => {
  const fetchIncomingEmails = (id: string) =>
    useQuery(FETCH_INCOMING_EMAILS, {
      variables: {
        id,
      },
      pollInterval: 500,
    });

  return {
    fetchIncomingEmails,
  };
};

export { useSession, useDomain, useEmail };
