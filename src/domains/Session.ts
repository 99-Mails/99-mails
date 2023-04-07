import type { ID, Timestamp } from "./Shared";
import type { Address } from "./Address";
import type { Mail } from "./Mail";

export type Session = {
  /**
   * ID
   */
  id: ID;

  /**
   * All the email addresses active in this session. Most recently added first.
   */
  addresses: [Address];

  /**
   * All the emails received by this session. Most recently received first
   */
  mails: [Mail];

  // """
  // All mails received after the mail with specified `Mail.id` (not inclusive). Most recently received first.
  // When `mailId` is not specified - returns the same result as `mails`.
  // Useful for simple pagination: when you receive multiple mails in the same session, first you query
  // this field without `mailId` and after you received the 1st mail, use it's ID as an argument
  // and so on.
  // For more advanced pagination see `mailsConnection`.
  // """
  // mailsAfterId(mailId: ID): [Mail]

  // """
  // Relay-standard pagination for mails belonging to this session.
  // See https://relay.dev/graphql/connections.htm
  // Cursor is executed in the following order:
  // 1. Take all the session's emails
  // 2. Sort using `sort`: Order.DESC - newest first (default); Order.ASC - oldest first
  // 3. Drop all the mails up to and including `after`
  // 4. Drop all the mails following and including `before`
  // 5. From result of (4) take only `first` number of elements from start
  // 6. From result of (5) take only `last` number of elements from end
  // When only one defined:
  // [A, B, C, D, E, F]
  //       [C, D, E, F] After(B)
  // [A, B, C, D]       Before(E)
  // [A, B, C]          First(3)
  //          [D, E, F] Last(3)
  // When all defined:
  // [A, B, C, D, E, F]
  //    [B, C, D, E, F] After(A)
  //    [B, C, D, E]    Before(F)
  //    [B, C, D]       First(3)
  //       [C, D]       Last(2)
  // """
  // mailsConnection(after: String, first: Int, before: String, last: Int, sort: Order = DESC): SessionMailsConnection,

  /**
   * URL where all raw `mails` can be downloaded as .zip archive
   */
  downloadZipUrl: URL;

  /**
   * Time (always in the future), when this session going to self-destruct
   */
  expiresAt: Timestamp;
};
