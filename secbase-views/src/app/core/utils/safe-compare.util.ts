import {SafeCompareOptions} from '@core/interfaces/app.interface';

/**
 * A highly resilient comparison utility for UI logic.
 * Solves common edge cases:
 * - null vs undefined -> true
 * - " 123 " vs 123 -> true
 * - "Admin" vs "admin" -> true
 * - Date(A) vs Date(B) -> true
 * - { id: 1 } vs { id: 1 } -> true
 */
export function safeCompare(a: any, b: any, options: SafeCompareOptions = {}): boolean {
  const { strict = false, caseSensitive = false } = options;

  // 1. Strict equality (Catches identical references and primitives)
  if (a === b) return true;

  // 2. Strict Mode Bypass
  if (strict) return false;

  // 3. Null / Undefined normalization
  // In UI, if both are "empty" (null/undefined), they are considered equal
  if (a == null && b == null) return true;

  // If only ONE is empty, they are not equal
  if (a == null || b == null) return false;

  // 4. Date Comparison
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // 5. String / Number Smart Comparison (Coercion, Trimming, Case)
  if (typeof a === 'string' || typeof b === 'string' || typeof a === 'number' || typeof b === 'number') {
    let strA = String(a).trim();
    let strB = String(b).trim();

    if (!caseSensitive) {
      strA = strA.toLowerCase();
      strB = strB.toLowerCase();
    }

    return strA === strB;
  }

  // 6. Deep Object / Array Comparison (Fallback for UI state)
  if (typeof a === 'object' && typeof b === 'object') {
    try {
      return JSON.stringify(a) === JSON.stringify(b);
    } catch {
      return false; // Failsafe for circular references
    }
  }

  // 7. Ultimate Fallback (Loose equality)
  return a == b;
}
