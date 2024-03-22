import defaultAndCureRateFlow from '../../data/default_curate_rate_flow_tag.json'
import searchResults from '../../data/search_flows_results_secured_portfolio_and_all_stream.json'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

// eslint-disable-next-line no-unused-vars
export async function fetchFlows(stream, portfolio) {
	// here we have a bunch of if statements

	return searchResults
}

/**
 * Gets a FlowTag with specific attributes.
 * @returns {FlowTag} - The FlowTag.
 */
export async function fetchLatestFlowLatestTag(id, sleepTime = 500) {
	await delay(sleepTime)
	console.log('fetchLatestFlowLatestTag...', id)

	const flows = {
		'flow-id-1': defaultAndCureRateFlow
	}

	if (!flows[id]) {
		throw new Error('Flow does not exist in server.')
	}

	return flows[id]
}
