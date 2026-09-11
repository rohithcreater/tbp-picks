export type Retailer = "amazon" | "flipkart" | "myntra" | "other";

export type RetailerProduct = {
  id: string;
  name: string;
  imageUrl?: string;
  price?: number;
  currency: "INR";
  productUrl: string;
  affiliateUrl?: string;
  retailer: Retailer;
};