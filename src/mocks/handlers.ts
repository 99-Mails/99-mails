import { graphql } from "msw";
import EmptySession from "./responses/EmptySession.json";
import GetAddressWithSession from "./responses/GetAddressWithSession.json";
import FetchIncomingEmail from "./responses/FetchIncomingEmail.json";
import FetchIncomingEmailWithEmails from "./responses/FetchIncomingEmailWithEmails.json";
import FetchIncomingEmailWithoutEmails from "./responses/FetchIncomingEmailWithoutEmails.json";

const disposableTempEmails = graphql.link(
  "https://vercel-express-proxy.vercel.app/temp-email-api"
);

const getAddressWithSession = disposableTempEmails.query(
  "GetAddressWithSession",
  (req, res, ctx) => {
    if (req.variables.id === "123456") {
      return res(ctx.data(EmptySession));
    }

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

    if (req.variables.id === "654321") {
      return res(
        ctx.data(FetchIncomingEmailWithoutEmails),
        ctx.delay(200 + Math.random() * 300)
      );
    }

    return res(ctx.data(FetchIncomingEmail));
  }
);

export default [getAddressWithSession, fetchIncomingEmail];
