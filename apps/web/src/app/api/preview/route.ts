import { env } from "@env";
import configPromise from "@payload-config";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import type { CollectionSlug, PayloadRequest, TypedLocale } from "payload";
import { getPayload } from "payload";

/**
 * Preview Route - Enables draft mode for authenticaded paylaod users
 *
 * Security Layers:
 * 1. Preview secret validation
 * 2. paylaod authentication verifcation
 * 3. Document existence check
 *
 * Flow:
 * 1. Payload admin -> sends user here with secret + auth headers
 * 2. Validate secret token
 * 3. Verify user is authenricated in Payload
 * 4. Check document exists
 * 5. Enable draft mode and redirect
 */
export async function GET(req: NextRequest): Promise<Response> {
  const payload = await getPayload({ config: configPromise });
  const { searchParams } = new URL(req.url);

  // Extract params which paylaod sends, i.e. gifts yay!
  const path = searchParams.get("path");
  const collection = searchParams.get("collection") as CollectionSlug;
  const slug = searchParams.get("slug");
  const previewSecret = searchParams.get("previewSecret");
  const locale = searchParams.get("locale") as TypedLocale;

  // Secutry layer 1. Validate preview secret
  if (previewSecret !== env.PREVIEW_SECRET) {
    payload.logger.error("Invalid preview secret attempted");
    return new Response("Invalid preview token", { status: 403 });
  }

  if (!(path && collection && slug)) {
    return new Response(
      "Missing required parameters: path, collection or slug",
      {
        status: 400,
      }
    );
  }

  if (!path.startsWith("/")) {
    return new Response("Path must be relative (start with /)", {
      status: 400,
    });
  }

  // 2. Verify payload auth
  let user;

  try {
    user = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    });
  } catch (error) {
    payload.logger.error({ err: error }, "Authentication failed for preview");
    const draft = await draftMode();
    draft.disable();
    return new Response("Authentication required. Please log in to Payload.", {
      status: 401,
    });
  }

  if (!user) {
    payload.logger.warn("Unauthenticated preview attempt");

    const draft = await draftMode();

    draft.disable();
    return new Response("Authentication required. Please log in to Payload.", {
      status: 401,
    });
  }

  try {
    await payload.find({
      collection,
      where: {
        slug: {
          equals: slug,
        },
      },
      draft: true,
      locale: locale || undefined,
    });
  } catch (error) {
    payload.logger.error(
      { err: error, collection, slug },
      "Document not found for preview"
    );
    return new Response(`Document not found: ${collection}/${slug}`, {
      status: 404,
    });
  }

  const draft = await draftMode();
  draft.enable();

  const redirectUrl = locale ? `/${locale}${path}` : path;

  payload.logger.info(
    { user: user.user, collection, slug, locale },
    "Preview enabled"
  );

  redirect(redirectUrl);
}
