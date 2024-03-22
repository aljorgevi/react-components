import { formatCustomDate } from '../src/utils/helpers'

/**
 * Composes a detailed label using provided tag information.
 * @param {Object} params The parameters containing tag details.
 * @param {string} params.name The name of the tag.
 * @param {string} params.objectId The object ID of the tag.
 * @param {Date|string} params.asOfTime The creation time of the tag.
 * @returns {string} The composed detailed label.
 */
export function composeDetailedLabel({ name = 'Undefined Name', objectId, asOfTime }) {
	return `${name} (ID: ${objectId}) (CREATED: ${formatCustomDate(asOfTime)})`
}

/**
 * Destructures values from a tag object.
 * @param {Object} tag - The tag object containing attrs and definition.
 * @returns {Object} The destructured values.
 */
export function extractTagDetails(tag) {
	// const unknownValue = 'Unknown'
	const { definition, attrs } = tag
	const { asOfTime, objectId } = definition
	// add more trac_values...

	return {
		definition,
		attrs,
		asOfTime,
		objectId
	}
}
