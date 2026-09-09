import { NextResponse } from "next/server";
import { retailerConfig } from "@/lib/retailers/config";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Retailer API adapters are ready. Add credentials and implement the approved affiliate/API calls.",
    retailers: retailerConfig,
  });
}
