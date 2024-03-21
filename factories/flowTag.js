import { composeDetailedLabel } from './tagHelpers'

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
