/**
 * Checks if a value is empty.
 * An empty value is an object with no own properties,
 * an array with no elements, a string with no characters,
 * a map or set with no elements, a falsy value, or an iterable with no elements.
 *
 * @param value - The value to check.
 * @returns True if the value is empty, false otherwise.
 */
export function isEmpty(value: any): boolean {
	if (value == null) {
		return true
	}

	if (typeof value === 'boolean') {
		return false
	}

	if (typeof value === 'number') {
		return isNaN(value)
	}

	if (typeof value === 'string' || Array.isArray(value)) {
		return value.length === 0
	}

	if (value instanceof Map || value instanceof Set) {
		return value.size === 0
	}

	if (typeof value === 'object') {
		return Object.keys(value).length === 0
	}

	if (value[Symbol.iterator] && typeof value[Symbol.iterator] === 'function') {
		return [...value].length === 0
	}

	return false
}
