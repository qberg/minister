import {
  type MotionValue,
  motion,
  useSpring,
  useTransform,
} from "motion/react";

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
      className="pointer-events-none fixed top-0 left-0 z-50 flex items-center gap-2 rounded-lg border border-white/20 bg-black/40 px-3 py-1.5 shadow-2xl backdrop-blur-xl"
      exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
      initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
      style={{ x, y }}
      transition={{ type: "spring", duration: 0.3, bounce: 0 }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
      <span className="font-medium text-white text-xs tracking-wide antialiased">
        {text}
      </span>
    </motion.div>
  );
}

export default Tooltip;
