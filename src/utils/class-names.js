export default (classes) =>
  Object.entries(classes)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(" ");
