import Hashids from 'hashids'
import base64 from 'base64url'
// import { E_AGREGGATOR } from "./index";

export class LinksV2 {
  public static hashids = new Hashids('d634ff5b-f141-4f49-8d9f-6875b14733c8', 8)
  //+- 1

  public static hash(id: string): string {
    return this.hashids.encode(id)
  }

  public static un_hash(id: string) {
    return this.hashids.decode(id)
  }

  public static getPathToShare(id: string) {
    let alphabetId = 'u/' + this.hash(id)
    const link = process.env.CATALOG_LINK + alphabetId
    return link
  }

  public static decoder_lien(lien_code: string) {
    return this.un_hash(lien_code.substring(2))
  }

  // base 64
  public static base64_encode_url(str: string) {
    return base64.fromBase64(Buffer.from(str).toString('base64'))
  }

  public static base64_decode_url(str: string) {
    return Buffer.from(base64.toBase64(str), 'base64').toString()
  }

  // static get_agreggator_link(agreggator: string) {
  //   const url =
  //     agreggator === E_AGREGGATOR.FLEX_PAY
  //       ? process.env.FLEXPAY_URL
  //       : process.env.FLEXPAY_URL;
  //   return ${url};
  // }
}
