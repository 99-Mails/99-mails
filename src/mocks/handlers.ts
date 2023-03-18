import { graphql } from "msw";
import GetAddressWithSession from "./responses/GetAddressWithSession.json";

const disposableTempEmails = graphql.link(
  "https://vercel-express-proxy.vercel.app/temp-email-api"
);

const getAddressWithSession = disposableTempEmails.query(
  "GetAddressWithSession",
  (_, res, ctx) => {
    return res(ctx.data(GetAddressWithSession));
  }
);

export default [getAddressWithSession];
