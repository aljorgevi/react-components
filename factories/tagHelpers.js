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
