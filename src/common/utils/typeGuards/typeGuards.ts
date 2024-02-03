/* eslint-disable implicit-arrow-linebreak, operator-linebreak */

export const isNumber = (target: unknown): target is number =>
  typeof target === 'number' || target instanceof Number || target === Number;

export const isString = (target: unknown): target is string =>
  typeof target === 'string' || target instanceof String || target === String;

export const isBoolean = (target: unknown): target is boolean =>
  typeof target === 'boolean' ||
  target instanceof Boolean ||
  target === Boolean;

export const isUndefined = (target: unknown): target is undefined =>
  typeof target === 'undefined';

export const isNull = (target: unknown): target is null => target === null;

export const isArray = (target: unknown): target is any[] =>
  Array.isArray(target);

export const isPrimitive = (target: unknown): target is boolean =>
  isString(target) || isNumber(target) || isBoolean(target) || isNull(target);

export const isFunction = (target: unknown): target is () => unknown =>
  typeof target === 'function';

export const isObject = (target: unknown): target is Record<string, unknown> =>
  typeof target === 'object' && !isNull(target) && !isArray(target);
