import { motion } from "motion/react";
import { patternPaths } from "@/lib/data/patterns";

type Props = {
  className?: string;
};

const AnimatedPattern = ({ className }: Props) => {
  return (
    <motion.svg
      width="1264"
      height="1264"
      viewBox="0 0 1264 1264"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
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
            <motion.path
              key={index}
              d={d}
              fill="#002E71"
              fillOpacity="0.24"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.0003,
                duration: 0.4,
                ease: "easeOut",
              }}
            />
          ))}
        </g>
      </g>

      <defs>
        <clipPath id="clip0_4114_21131">
          <rect width="1264" height="1264" fill="white" />
        </clipPath>
      </defs>
    </motion.svg>
  );
};

export default AnimatedPattern;
