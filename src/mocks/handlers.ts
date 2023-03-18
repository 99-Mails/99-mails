import { graphql } from "msw";
import GetAddressWithSessionResponse from "./responses/GetAddressWithSession.json";

export const GetAddressWithSession = GetAddressWithSessionResponse;

const disposableTempEmails = graphql.link(
  "https://vercel-express-proxy.vercel.app/temp-email-api"
);
// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [
  disposableTempEmails.query("GetAddressWithSession", (req, res, ctx) => {
    return res(ctx.data(GetAddressWithSessionResponse));
  }),
];
