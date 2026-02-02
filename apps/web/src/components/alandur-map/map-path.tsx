import { motion } from "motion/react";

type Props = {
  d: string;
  slug: string;
  name: string;
  type: string;
  isActive: boolean;
  onSelect: (slug: string) => void;
  onHover: (name: string, e: React.MouseEvent) => void;
  onLeave: () => void;
};

function MapPath({
  d,
  slug,
  name,
  type,
  isActive,
  onSelect,
  onHover,
  onLeave,
}: Props) {
  return (
    <motion.path
      animate={isActive ? "active" : "idle"}
      d={d}
      data-slug={slug}
      data-type={type}
      id={slug}
      initial="idle"
      onClick={(e) => {
        e.stopPropagation();
        onSelect(slug);
      }}
      //Animations
      onMouseEnter={(e) => onHover(name, e)}
      onMouseLeave={onLeave}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        restDelta: 0.01,
      }}
      variants={{
        idle: {
          fill: "#FCE8D0",
          stroke: "#111111",
          strokeWidth: 1,
          scale: 1,
          transform: "translate(0px, 0px)",
        },
        hover: {
          fill: "#F1BB50",
          stroke: "#111111",
          strokeWidth: 2,
          cursor: "pointer",
          transform: "translate(-1px, -1px)",
        },
        active: {
          fill: "#AA8336",
          stroke: "#111111",
          strokeWidth: 2,
          cursor: "pointer",
          transform: "translate(-2px, -2px)",
        },
        pressed: {
          scale: 0.98,
        },
      }}
      whileHover={isActive ? "active" : "hover"}
      whileTap="pressed"
    />
  );
}

export default MapPath;
