import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");

  if (slug) {
    revalidateTag(`global_${slug}`);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  }

  return NextResponse.json({ revalidated: false, message: "Missing slug" });
}
