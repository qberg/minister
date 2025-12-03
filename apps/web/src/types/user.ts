import { User } from "@/payload-types";

export type UserRole = NonNullable<User["roles"]>[number];
