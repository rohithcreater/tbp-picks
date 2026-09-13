import type { Retailer } from "./types";

export function buildAffiliateLink(retailer: Retailer, productUrl: string): string {
  const url = new URL(productUrl);

  switch (retailer) {
    case "amazon": {
      const tag = process.env.AMAZON_PARTNER_TAG;
      if (tag) url.searchParams.set("tag", tag);
      return url.toString();
    }
    case "flipkart": {
      const affId = process.env.FLIPKART_AFFILIATE_ID;
      if (affId) url.searchParams.set("affid", affId);
      return url.toString();
    }
    case "myntra": {
      const affId = process.env.MYNTRA_AFFILIATE_ID;
      if (affId) url.searchParams.set("ref", affId);
      return url.toString();
    }
        case "meesho": {
      const affId = process.env.MEESHO_AFFILIATE_ID;
      if (affId) url.searchParams.set("ref", affId);
      return url.toString();
    }
    case "other":
    default:
      return url.toString();
  }
}