const toString = Object.prototype.toString

export function isFunction (value) { return typeof value === 'function' }
export function isRegExp (value) {
  return toString.call(value) === '[object RegExp]'
}
export function isString (value) { return typeof value === 'string' }
export function isObject(value) {
  return value !== null && typeof value === 'object';
}
export const isArray = Array.isArray

export default {
  isFunction,
  isRegExp,
  isString,
  isObject,
  isArray,
}