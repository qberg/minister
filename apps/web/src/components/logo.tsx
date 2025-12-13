import Image from "next/image";

const LOGO_STYLES = {
  width: "clamp(1.5rem, 0rem + 3.125vw, 5rem)",
};

const Logo = () => (
  <div
    className="relative aspect-square rounded-full bg-secondary overflow-hidden"
    style={LOGO_STYLES}
  >
    <Image
      src="/logo.png"
      alt="Anbarasan Logo - Go to Home page"
      fill
      priority
      className="object-cover"
      sizes="5vw"
    />
  </div>
);

export default Logo;
