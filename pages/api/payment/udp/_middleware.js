import { NextResponse } from "next/server";

export function middleware(req) {
  const country = req.geo?.country || "BD";
  if (country === "BD") {
    return NextResponse.next();
  } else {
    const url = req.nextUrl.origin;
    return NextResponse.redirect(`${url}/pricing`);
  }
}
