import { NextRequest, NextResponse } from "next/server";
import { buildAffiliateLink } from "@/lib/retailers/buildAffiliateLink";
import type { Retailer } from "@/lib/retailers/types";

const VALID_RETAILERS: Retailer[] = ["amazon", "flipkart", "myntra", "meesho", "other"];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const retailer = searchParams.get("retailer");
  const productUrl = searchParams.get("url");

  if (!retailer || !productUrl || !VALID_RETAILERS.includes(retailer as Retailer)) {
    return NextResponse.json(
      { ok: false, error: "Missing or invalid retailer/url" },
      { status: 400 }
    );
  }

  try {
    const destination = buildAffiliateLink(retailer as Retailer, productUrl);
    return NextResponse.redirect(destination, { status: 307 });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid product URL" }, { status: 400 });
  }
}