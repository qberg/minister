import { patternPaths } from "@/lib/data/patterns";

type Props = {
  className?: string;
};

const AnimatedPattern = ({ className }: Props) => (
  <svg
    className={className}
    fill="none"
    height="1264"
    viewBox="0 0 1264 1264"
    width="1264"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_4114_21131)">
      <mask
        height="1264"
        id="mask0_4114_21131"
        maskUnits="userSpaceOnUse"
        width="1264"
        x="0"
        y="0"
      >
        <path d="M1264 0H0V1264H1264V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_4114_21131)">
        {patternPaths.map((d, index) => (
          <path d={d} fill="#002E71" fillOpacity="0.24" key={index} />
        ))}
      </g>
    </g>
    <defs>
      <clipPath id="clip0_4114_21131">
        <rect fill="white" height="1264" width="1264" />
      </clipPath>
    </defs>
  </svg>
);

export default AnimatedPattern;
