import { draftMode } from "next/headers";

/**
 * Exit Preview Route - Disables draft mode
 *
 * Usage:
 * - Call this endpoint to disable preview
 * - User can then navigate normally or refresh to see published content
 */
export async function GET(): Promise<Response> {
  const draft = await draftMode();
  draft.disable();
  return new Response("Draft mode is disabled");
}
