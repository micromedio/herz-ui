export const isBrowser =
  typeof window !== "undefined" && typeof document !== "undefined"

export function ssrSafeCreateDiv() {
  return isBrowser ? document.createElement("div") : null
}
