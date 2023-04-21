import type { DecodeStatus, TextSource, Timestamp } from "@/types";
import type { Attachment } from "./attachment";

export type Mail = {
  /**
   * ID
   */
  id: string;

  /**
   * Raw email (same as `raw` field) can be downloaded from this URL
   */
  downloadUrl: URL;

  /**
   * timestamp of when this email was received
   */
  receivedAt: Timestamp;

  /**
   * Raw unmodified value of the receiving email address string (so, when extended address was used,
   * this field will contain extended address)
   */
  toAddrOrig: string;

  /**
   * Value of MIME `From` header (only when decodeStatus is OK)
   */
  headerFrom: string;

  /**
   * Value of MIME `Subject` header (only when decodeStatus is OK)
   */
  headerSubject: string;

  /**
   * Cleaned text payload of the email. When MIME contains `text/plain` version, we put it here.
   * When MIME has only HTML body, we extract text from HTML (see textSource).
   * It's NULL when decodeStatus is ERROR_DECODING
   */
  text: string;

  /**
   * If MIME has HTML version, this field contains raw value of this HTML
   */
  html: string;

  /**
   * How `text` field was populated (from MIME `text/plain` or `text/html`)
   */
  textSource: TextSource;

  /**
   * Value of SMTP `RCPT TO` command
   */
  fromAddr: string;

  /**
   * Raw contents of the email exactly as it was received
   */
  raw: string;

  /**
   * Size of `raw` field
   */
  rawSize: number;

  /**
   * Reflects the extent to which this MIME mail was decoded (not all emails are valid MIME, so sometimes we are not able to decode them)
   */
  decodeStatus: DecodeStatus;

  /**
   * Just <login>@<domain> email address.
   * When extended address was used, extensions are dropped from this field
   */
  toAddr: string;

  /**
   * true if email has text/html body version.
   * false when there is no HTML version
   * null when `decodeStatus` is ERROR_DECODING.
   */
  hasHtml: boolean;

  /**
   * List of mail's attachents, if any and only when decodeStatus is STRICT
   */
  attachments: Attachment[];
};

// """
// If MIME has HTML version, this field contains sanitized version of this HTML:
// * `<script>` tags are cleaned
// * `<style>` tags are cleaned
// * `<link>` tags are removed
// * `<iframe>` tags are removed
// * `<meta>` tags are removed
// * `style` attributes are removed
// * `on*` attributes are removed
// * `href=\"javascript:\"` are removed
// * `<img src="">` is cleaned, based on (nullable) sanitizerConfig
// When `sanitizerConfig` is not provided, default `HtmlSanitizerConfig` is applied
// """
// sanitizedHtml(sanitizerConfig: HtmlSanitizerConfig): String

// """
// Similar to `sanitizedHtml`, but returns an URL where that same sanitized HTML can be downloaded.
// """
// downloadSanitizedHtmlUrl(sanitizerConfig: HtmlSanitizerConfig): Url

export type MailSummary = Pick<
  Mail,
  "headerSubject" | "text" | "fromAddr" | "downloadUrl" | "toAddr"
>;
