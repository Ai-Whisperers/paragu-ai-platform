import { NextResponse } from "next/server";
import { SEARCH_DOCS } from "@/content/search-index";

// Public-facing JSON dump of the search index.
// Loaded by SearchBar at runtime. Keep the URL stable.

export const dynamic = "force-static";

export function GET() {
  return new NextResponse(JSON.stringify(SEARCH_DOCS), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
