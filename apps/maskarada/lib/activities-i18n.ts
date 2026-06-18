// Data-loader for activities with EN support.

import { activities, getActivity } from "./activities";
import { ACTIVITIES_EN } from "./activities-en";
import type { Activity } from "./activities";

export function getActivityI18n(slug: string, locale: "es" | "en"): Activity | null {
  const a = getActivity(slug);
  if (!a) return null;
  if (locale === "es") return a;
  const override = ACTIVITIES_EN[a.slug];
  if (!override) return a;
  return {
    ...a,
    name: override.name,
    tagline: override.tagline,
    shortDesc: override.shortDesc,
    longDesc: override.longDesc,
  };
}

export function listActivitiesI18n(locale: "es" | "en") {
  if (locale === "es") return activities;
  return activities.map((a) => {
    const override = ACTIVITIES_EN[a.slug];
    if (!override) return a;
    return { ...a, name: override.name, tagline: override.tagline, shortDesc: override.shortDesc };
  });
}
