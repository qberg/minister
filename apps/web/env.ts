import { createEnv } from "@t3-oss/env-nextjs";
import { keys as webKeys } from "./keys";

export const env = createEnv({
  extends: [webKeys()],
  server: {},
  client: {},
  runtimeEnv: {},
});
