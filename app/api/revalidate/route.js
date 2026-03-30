import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { paths } = await request.json();

    if (paths && Array.isArray(paths)) {
      for (const p of paths) {
        revalidatePath(p);
      }
    } else {
      // Default: revalidate everything
      revalidatePath("/", "layout");
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ revalidated: false, error: err.message }, { status: 500 });
  }
}
