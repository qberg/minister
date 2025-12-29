import configPromise from "@payload-config";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getPayload, type TypedLocale } from "payload";
import { cache } from "react";
import { BlockRenderer } from "@/blocks/block-renderer";
import { LivePreviewListener } from "@/components/live-preview-listener";
import { HeroRenderer } from "@/heros/hero-renderer";
import type { Page } from "@/payload-types";

const PRE_RENDER_LOCALES: TypedLocale[] = ["ta-IN"];

type Props = {
  params: Promise<{
    locale: TypedLocale;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  try {
    const pages = await payload.find({
      collection: "pages",
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: "published",
        },
      },
      select: {
        slug: true,
      },
    });

    const params = [];

    for (const locale of PRE_RENDER_LOCALES) {
      for (const page of pages.docs) {
        params.push({
          locale,
          slug: page.slug,
        });
      }
    }

    return params;
  } catch (error) {
    payload.logger.error(`[GENERATE STATIC PARAMS ERROR]: ${error}`);

    return [];
  }
}

export default async function SlugPage({ params }: Props) {
  const { locale, slug } = await params;

  const { isEnabled: isDraft } = await draftMode();

  const page = await queryPageBySlug({ slug, locale });

  if (!page) {
    notFound();
  }

  const hasHero = page.hero && page.hero.length > 0;
  const hasLayout = page.layout && page.layout.length > 0;

  return (
    <main>
      {isDraft && <LivePreviewListener />}

      {hasHero && <HeroRenderer hero={page.hero} />}

      {hasLayout && <BlockRenderer blocks={page.layout} locale={locale} />}
    </main>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: Props): Promise<Metadata> {
  const { locale, slug } = await paramsPromise;
  const page = await queryPageBySlug({ slug, locale, draft: false });

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.title || "T.M. Anbarasan",
    description: page.excerpt || "",
    openGraph: {
      title: page.title || "T.M. Anbarasan",
      description: page.excerpt || "",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title || "T.M. Anbarasan",
      description: page.excerpt || "",
    },
  };
}

const queryPageBySlug = cache(
  async ({
    slug,
    locale,
    draft,
  }: {
    slug: string;
    locale: TypedLocale;
    draft?: boolean;
  }) => {
    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
      collection: "pages",
      limit: 1,
      depth: 1,
      pagination: false,
      locale,
      draft,
      overrideAccess: draft,
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
            ...(draft
              ? {}
              : {
                  _status: {
                    equals: "published",
                  },
                }),
          },
        ],
      },
    });

    return (result?.docs?.[0] as Page) || null;
  }
);
