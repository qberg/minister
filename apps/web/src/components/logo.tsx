import Image from "next/image";

const LOGO_STYLES = {
  width: "clamp(1.5rem, 0rem + 3.125vw, 5rem)",
};

const Logo = () => (
  <div
    className="relative aspect-square overflow-hidden rounded-full bg-yellow-300"
    style={LOGO_STYLES}
  >
    <Image
      alt="Anbarasan Logo - Go to Home page"
      className="object-cover"
      fill
      priority
      sizes="5vw"
      src="/DP_2.webp"
    />
  </div>
);

export default Logo;
