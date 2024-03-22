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
 * Destructures values from a flow tag object.
 * @param {Object} tag - The tag object containing attrs and definition.
 * @returns {Object} The destructured values.
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
