import type { Retailer } from "./types";

export const retailerConfig: Record<Retailer, { enabled: boolean }> = {
  amazon: { enabled: Boolean(process.env.AMAZON_PARTNER_TAG) },
  flipkart: { enabled: Boolean(process.env.FLIPKART_AFFILIATE_ID) },
  myntra: { enabled: Boolean(process.env.MYNTRA_AFFILIATE_ID) },
};
