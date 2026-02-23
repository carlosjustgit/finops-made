import type { UTMParams } from "@/types/diagnostic";

const UTM_KEY = "finops_utm";

const UTM_PARAM_NAMES: (keyof UTMParams)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
];

export function captureUTM(): UTMParams {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utm: UTMParams = {};

  for (const key of UTM_PARAM_NAMES) {
    const val = params.get(key);
    if (val) {
      utm[key] = val;
    }
  }

  if (Object.keys(utm).length > 0) {
    try {
      sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
    } catch {
      // sessionStorage unavailable — silent fail
    }
  }

  return utm;
}

export function getStoredUTM(): UTMParams {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem(UTM_KEY);
    if (stored) return JSON.parse(stored) as UTMParams;
  } catch {
    // silent fail
  }
  return {};
}
