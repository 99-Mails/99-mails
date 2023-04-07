export type Attachment = {
  /**
   * ID
   */
  id: string;

  /**
   * Raw attachment body can be downloaded by this URL
   */
  downloadUrl: URL;

  /**
   * Name of the attached file
   */
  name: string;

  /**
   * MIME-type of the attached file
   */
  mime: string;

  /**
   * Raw contents of the attachment (only when it's utf8 plaintext)
   */
  raw: string;

  /**
   * Size of the raw payload
   */
  rawSize: BigInt;
};
