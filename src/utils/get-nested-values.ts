export function getNestedValue(
  obj: Record<string | number | symbol, any>,
  path: string,
) {
  return path
    .split(".")
    .reduce((acc, key) => acc && acc[key as keyof typeof acc], obj);
}
