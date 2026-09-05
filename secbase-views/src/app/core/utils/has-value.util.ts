/**
 * A robust type guard that checks if a value is truly present.
 * Fails on: null, undefined, '', '   ', [], and {}
 * Passes on: 0, false, Date objects, populated arrays/objects/strings.
 */
export function hasValue<T>(value: T | null | undefined): value is T {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === 'string') {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === 'object') {
    // Dates are objects but shouldn't be checked for keys
    if (value instanceof Date) {
      return true;
    }
    // Check for empty objects {}
    return Object.keys(value).length > 0;
  }

  // Numbers (including 0) and Booleans (including false) return true
  return true;
}
