import { patternPaths } from "@/lib/data/patterns";

type Props = {
  className?: string;
};

const AnimatedPattern = ({ className }: Props) => {
  return (
    <svg
      width="1264"
      height="1264"
      viewBox="0 0 1264 1264"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_4114_21131)">
        <mask
          id="mask0_4114_21131"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1264"
          height="1264"
        >
          <path d="M1264 0H0V1264H1264V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_4114_21131)">
          {patternPaths.map((d, index) => (
            <path key={index} d={d} fill="#002E71" fillOpacity="0.24" />
          ))}
        </g>
      </g>
      <defs>
        <clipPath id="clip0_4114_21131">
          <rect width="1264" height="1264" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AnimatedPattern;
