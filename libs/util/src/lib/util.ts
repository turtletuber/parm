export const not =
  <T>(predicate: (o: T) => boolean) =>
    (o: T) => !predicate(o);