import { Typography } from "@repo/design-system/components/ui/typography";

type Props = {
  text: string;
};

const Heading = ({ text }: Props) => (
  <div className="border-secondary border-b-2">
    <Typography
      as="h6"
      className="mb-2 text-secondary"
      intent={"title"}
      variant="headingXXS"
    >
      {text}
    </Typography>
  </div>
);

export default Heading;
