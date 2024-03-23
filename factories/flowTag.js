import { composeDetailedLabel, extractTagDetails } from './tagHelpers'

/**
 * Converts a flow tag into a dropdown option format.
 * @param {Object} tag The flow tag to convert.
 * @returns {{value: string, label: string}} The dropdown option.
 */
export function flowTagToDropdownOption(tag) {
	const { objectId, asOfTime } = tag.definition
	const flowName = tag.attrs.flowName?.value || 'No name set'
	const label = composeDetailedLabel({ asOfTime, name: flowName, objectId })

	return { value: objectId, label }
}

export function mapFlowSearchToDropdownOptions(searchResponse) {
	// filter flows that have viewInLists attr set to false
	const filteredTags = searchResponse.tags.filter(tag => tag.attrs.viewInLists?.value)
	const options = filteredTags.map(flowTagToDropdownOption)

	// return datasets
	return options
}

/**
 * Extracts and structures details from a flow tag object. This includes details
 * such as inputs, nodes, and various attributes like flow name, portfolio ID,
 * and visibility in lists. If the `tag` parameter is not provided, the function
 * returns `undefined`.
 *
 * @param {Object} tag - The tag object to destructure, containing `attrs` for attributes
 * and `definition` for the flow's structural details.
 * @param {Object} tag.attrs - Attributes of the flow, including `flowName`, `portfolioId`,
 * and `viewInLists`.
 * @param {Object} tag.definition - Definition of the flow, including `inputs` and `nodes`.
 * @returns {{
 *   detailedLabel: string, // A composed label based on the asOfTime, name, and objectId.
 *   definition: Object, // The original definition object from the tag.
 *   attrs: Object, // The original attrs object from the tag.
 *   inputs: string[], // List of inputs from the flow's definition.
 *   nodes: Array, // List of nodes from the flow's definition.
 *   asOfTime: string, // The time attribute from the tag, indicating the last update time.
 *   objectId: string, // The ID of the object.
 *   flowName: string, // The name of the flow. Defaults to 'Unknown' if not provided.
 *   portfolioId: string, // The portfolio ID related to the flow. Defaults to 'Unknown' if not provided.
 *   viewInLists: boolean // Indicates if the flow should be visible in lists. Defaults to true.
 * }} The destructured and structured details from the flow tag, or `undefined` if the `tag` parameter is not provided.
 */
export function extractFlowTagDetails(tag) {
	if (!tag) return

	const unknownValue = 'Unknown'
	const { objectId, asOfTime, definition, attrs } = extractTagDetails(tag)

	const { inputs, nodes } = definition
	const { flowName, portfolioId, viewInLists } = attrs
	const label = composeDetailedLabel({ asOfTime, name: flowName?.value, objectId })

	return {
		detailedLabel: label,
		definition,
		attrs,
		inputs,
		nodes,
		asOfTime,
		objectId,
		flowName: flowName?.value || unknownValue,
		portfolioId: portfolioId?.value || unknownValue,
		viewInLists: viewInLists?.value || true
	}
}
