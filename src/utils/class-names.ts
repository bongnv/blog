export default (classes: Record<string, boolean>): string =>
  Object.entries(classes)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(" ");
