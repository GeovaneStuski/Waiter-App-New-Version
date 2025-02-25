export function getNestedValue(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Record<string | number | symbol, any>,
  path: string,
) {
  return path
    .split('.')
    .reduce((acc, key) => acc && acc[key as keyof typeof acc], obj);
}
