export type Retailer = "amazon" | "flipkart" | "myntra" | "meesho" | "other";

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