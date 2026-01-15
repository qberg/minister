import { Typography } from "@repo/design-system/components/ui/typography";
import Image from "next/image";
import { getMediaUrl } from "@/lib/payload-media-utils";
import type { OrgInfoTabItem } from "@/types";

const OrgCard = ({
  label,
  image,
  logo,
  description,
  stats,
}: OrgInfoTabItem) => {
  const imageSrc = getMediaUrl(image);
  const logoSrc = getMediaUrl(logo);

  return (
    <div className="flex w-full flex-col 4xl:gap-8 gap-4 lxl:gap-6 rounded-lg border-2 border-alt-border 4xl:p-8 lxl:p-6 p-4 md:flex-row">
      <div className="relative order-2 aspect-[0.75/1] w-full overflow-hidden rounded-lg md:w-[25vw] lg:order-1 2xl:w-[25vw]">
        {imageSrc && (
          <Image alt="Org Photo" className="object-cover" fill src={imageSrc} />
        )}
      </div>

      {/*content*/}
      <div className="order-1 flex flex-col justify-between 4xl:gap-16 gap-6 lxl:gap-12 4xl:p-8 lxl:p-6 p-4 lg:order-2">
        {/* logo + title */}
        <div className="flex items-center gap-4">
          {logoSrc && (
            <div className="relative aspect-square w-[4vw] shrink-0 overflow-hidden rounded-full">
              <Image
                alt={`${label}-logo`}
                className="object-cover"
                fill
                src={logoSrc}
              />
            </div>
          )}

          <Typography
            as="h4"
            className="text-yellow-400"
            variant="brandHeading"
          >
            {label}
          </Typography>
        </div>

        <Typography
          as="div"
          className="text-muted-foreground md:max-w-[45ch]"
          variant="bodyLG"
        >
          {description}
        </Typography>

        <div className="grid grid-cols-2">
          {stats?.map((stat) => (
            <div key={stat.id}>
              <Typography
                as="h2"
                className="mb-1 text-accent"
                variant="headingLG"
              >
                {stat.v}
              </Typography>
              <Typography as="p" className="text-neutral-200" variant="bodyLG">
                {stat.l}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrgCard;
