import { isObject } from 'util';

export const not =
  <T>(predicate: (o: T) => boolean) =>
    (o: T) => !predicate(o);

export const initConfig = <T>(config: T): T => {
  const warnings = [];
  const validate = (path, o) => {
    Object.keys(o).forEach(key => {
      const val = o[key];
      if (isObject(val)) {
        validate(path ? `${path}.${key}` : key, val);
      }
      if (val === '' || val === undefined) {
        warnings.push(`Could not load configuration for '${key}'.`);
      }
    });
  }
  validate('', config);
  if (warnings.length > 0) {
    warnings.forEach(warning => console.warn(warning));
    throw new Error('Some configuration variables could not be loaded. Exiting.');
  }
  return config;
}


export const range = size => [...Array(size).keys()];