import type { Formats } from "next-intl";

export const formats = {
  dateTime: {
    short: {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
    long: {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    },
    time: {
      hour: "2-digit",
      minute: "2-digit",
    },
  },
  number: {
    precise: {
      maximumFractionDigits: 5,
    },
    currency: {
      style: "currency",
      currency: "INR",
    },
    percent: {
      style: "percent",
      maximumFractionDigits: 2,
    },
  },
  list: {
    enumeration: {
      style: "long",
      type: "conjunction",
    },
  },
} satisfies Formats;
