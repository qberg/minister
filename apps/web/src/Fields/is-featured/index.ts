import type { Field } from "payload";

export const isFeat: Field = {
  name: "isFeat",
  type: "checkbox",
  defaultValue: false,
  admin: {
    position: "sidebar",
    description: "Should this album be visible to the public?",
  },
  label: "Is Featured",
};
