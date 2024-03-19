import { derived, readable } from "svelte/store";
import { Temporal } from "@js-temporal/polyfill";

export const date = readable(
  Temporal.Now.zonedDateTimeISO(),
  function start(set) {
    const interval = setInterval(() => {
      set(Temporal.Now.zonedDateTimeISO());
    }, 1000);

    return function stop() {
      clearInterval(interval);
    };
  }
);

export const formatedTime = derived(date, ($date) =>
  $date.toLocaleString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
);

export const formatedDate = derived(date, ($date) =>
  $date.toLocaleString("ru-RU", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  })
);
