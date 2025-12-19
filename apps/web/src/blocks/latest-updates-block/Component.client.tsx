"use client";

import type {
  LatestUpdateItem,
  LatestUpdatesBlockType,
  TagPreview,
} from "@/types";
import { Box } from "@repo/design-system/components/layout/box";
import { Stack } from "@repo/design-system/components/layout/stack";

import { parseAsString, useQueryStates } from "nuqs";
import { useEffect, useState, useTransition } from "react";
import type { CollectionSlug, TypedLocale } from "payload";
import { fetchLatestUpdatesAction } from "@/app/actions/latest-updates";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@repo/design-system/components/ui/tabs";
import { Typography } from "@repo/design-system/components/ui/typography";
import NewsFeatGrid from "./news-feat-grid";
import ArticlesGrid from "./articles-grid";
import AnnouncementsGrid from "./announcements-grid";

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
    <Box as="section">
      <Stack>
        {/* content type tabs*/}
        <Tabs
          value={currentType}
          onValueChange={handleTypeChange}
          className="inline-flex mx-auto"
        >
          <TabsList size="lg" variant="button">
            {block.enabled.map((type) => (
              <TabsTrigger key={type} value={type}>
                <Typography as="p" variant="bodyMD" className="uppercase">
                  {getContentTypeLabel(type)}
                </Typography>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/*Tag filters*/}
        {block.showTags && tags.length > 0 && (
          <Tabs
            value={currentTag}
            onValueChange={handleTagChange}
            className="inline-flex"
          >
            <TabsList size="lg" variant="line">
              <TabsTrigger key="all" value="all">
                <Typography as="p" variant="bodyMD" className="uppercase">
                  All
                </Typography>
              </TabsTrigger>
              {tags.map((tag) => (
                <TabsTrigger key={tag.slug} value={tag.slug as string}>
                  <Typography as="p" variant="bodyMD" className="uppercase">
                    {tag.label}
                  </Typography>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}

        {/* content grids */}
        {currentType === "announcements" && <AnnouncementsGrid />}
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
