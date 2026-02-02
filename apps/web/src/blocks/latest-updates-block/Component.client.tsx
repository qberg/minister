"use client";

import { Box } from "@repo/design-system/components/layout/box";
import { Stack } from "@repo/design-system/components/layout/stack";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@repo/design-system/components/ui/tabs";
import { Typography } from "@repo/design-system/components/ui/typography";
import { parseAsString, useQueryStates } from "nuqs";
import type { CollectionSlug, TypedLocale } from "payload";
import { useEffect, useState, useTransition } from "react";
import { fetchLatestUpdatesAction } from "@/app/actions/latest-updates";
import AnimatedPattern from "@/components/animated-pattern";
import type {
  LatestUpdateItem,
  LatestUpdatesBlockType,
  TagPreview,
} from "@/types";
import ArticlesGrid from "./articles-grid";
import NewsFeatGrid from "./news-feat-grid";

type Props = {
  block: LatestUpdatesBlockType;
  tags: TagPreview[];
  initialData: {
    docs: LatestUpdateItem[];
    hasNextPage: boolean;
    page: number;
    totalPages: number;
  };
  locale: TypedLocale;
};

const paramsParser = {
  type: parseAsString,
  tag: parseAsString.withDefault("all"),
};

const LatestUpdatesClient = ({ block, tags, initialData, locale }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [params, setParams] = useQueryStates(paramsParser, {
    shallow: true,
    history: "push",
  });

  const currentType = params.type || block.defType;
  const currentTag = params.tag;

  const [items, setItems] = useState<LatestUpdateItem[]>(initialData.docs);
  const [hasNextPage, setHasNextPage] = useState(initialData.hasNextPage);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    startTransition(async () => {
      const result = await fetchLatestUpdatesAction({
        locale,
        collection: currentType as CollectionSlug,
        tag: currentTag !== "all" ? currentTag : undefined,
        page: 1,
        limit: block.perPage,
      });

      setItems(result.docs);
      setHasNextPage(result.hasNextPage);
      setCurrentPage(1);
    });
  }, [currentType, currentTag, block.perPage, locale]);

  const handleTypeChange = (newType: string) => {
    setParams({
      type: newType,
      tag: "all",
    });
  };

  const handleTagChange = (newTag: string) => {
    setParams({
      tag: newTag,
    });
  };

  return (
    <Box as="section" className="relative">
      <AnimatedPattern className="absolute bottom-0 left-0 w-[50vw] translate-y-1/4" />
      <Stack className="relative z-10">
        {/* content type tabs*/}
        <Tabs
          className="mx-auto w-full overflow-x-auto md:w-auto [&::-webkit-scrollbar]:hidden"
          onValueChange={handleTypeChange}
          value={currentType}
        >
          <TabsList className="w-max min-w-full" size="lg" variant="button">
            {block.enabled.map((type) => (
              <TabsTrigger key={type} value={type}>
                <Typography as="p" className="uppercase" variant="bodyMD">
                  {getContentTypeLabel(type)}
                </Typography>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/*Tag filters*/}
        {block.showTags && tags.length > 0 && (
          <Tabs
            className="mx-auto w-full overflow-x-auto md:w-auto [&::-webkit-scrollbar]:hidden"
            onValueChange={handleTagChange}
            value={currentTag}
          >
            <TabsList className="w-max min-w-full" size="lg" variant="line">
              <TabsTrigger key="all" value="all">
                <Typography as="p" className="uppercase" variant="bodyMD">
                  All
                </Typography>
              </TabsTrigger>
              {tags.map((tag) => (
                <TabsTrigger key={tag.slug} value={tag.slug as string}>
                  <Typography as="p" className="uppercase" variant="bodyMD">
                    {tag.label}
                  </Typography>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}

        {/* content grids */}
        {currentType === "articles" && (
          <ArticlesGrid items={items} locale={locale} />
        )}
        {currentType === "news-feat" && (
          <NewsFeatGrid items={items} locale={locale} />
        )}
      </Stack>
    </Box>
  );
};

function getContentTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    announcements: "Announcements",
    articles: "Articles",
    "news-feat": "Newspaper Features",
  };
  return labels[type] || type;
}

export default LatestUpdatesClient;
