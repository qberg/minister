import {
  type MotionValue,
  motion,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";

const OFFSET = 15;

type Props = {
  text: string;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
};

function Tooltip({ text, mouseX, mouseY }: Props) {
  const springConfig = {
    damping: 30,
    stiffness: 300,
    mass: 0.5,
  };

  const x = useSpring(
    useTransform(mouseX, (val) => val + OFFSET),
    springConfig
  );
  const y = useSpring(
    useTransform(mouseY, (val) => val + OFFSET),
    springConfig
  );

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      className="pointer-events-none fixed top-0 left-0 z-50 flex flex-col items-center gap-2 rounded-lg border border-white/20 bg-black/70 px-4 py-4 shadow-2xl"
      exit={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
      initial={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
      style={{ x, y }}
      transition={{ type: "spring", duration: 0.3, bounce: 0 }}
    >
      <div className="flex items-center gap-2">
        <span className="font-medium text-white text-xs tracking-wide antialiased">
          {text}
        </span>
      </div>
      <div className="relative aspect-video w-[15vw] overflow-hidden rounded-lg bg-red-50">
        <Image
          alt="Zone Image"
          className="object-cover"
          fill
          src="/images/about-bg-2.png"
          unoptimized
        />
      </div>
    </motion.div>
  );
}

export default Tooltip;
