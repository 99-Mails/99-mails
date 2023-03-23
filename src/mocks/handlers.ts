import { graphql } from "msw";
import GetAddressWithSession from "./responses/GetAddressWithSession.json";
import FetchIncomingEmail from "./responses/FetchIncomingEmail.json";
import FetchIncomingEmailWithEmails from "./responses/FetchIncomingEmailWithEmails.json";

const disposableTempEmails = graphql.link(
  "https://vercel-express-proxy.vercel.app/temp-email-api"
);

const getAddressWithSession = disposableTempEmails.query(
  "GetAddressWithSession",
  (_, res, ctx) => {
    return res(ctx.data(GetAddressWithSession));
  }
);

const fetchIncomingEmail = disposableTempEmails.query(
  "FetchIncomingEmail",
  (req, res, ctx) => {
    if (req.variables.id === "123456") {
      return res(
        ctx.data(FetchIncomingEmailWithEmails),
        ctx.delay(200 + Math.random() * 300)
      );
    }

    return res(ctx.data(FetchIncomingEmail));
  }
);

export default [getAddressWithSession, fetchIncomingEmail];
