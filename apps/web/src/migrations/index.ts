import * as migration_20251208_080801 from "./20251208_080801";

export const migrations = [
  {
    up: migration_20251208_080801.up,
    down: migration_20251208_080801.down,
    name: "20251208_080801",
  },
];
