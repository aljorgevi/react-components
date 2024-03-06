import { useLocation } from 'react-router-dom'

export function useQueryChecker() {
	const { search } = useLocation()
	const queryParams = new URLSearchParams(search)

	const flowId = queryParams.get('flowId')
	const previousJob = queryParams.get('previousJob')

	const hasFlowId = queryParams.has('flowId')
	const hasPreviousJob = queryParams.has('previousJob')

	return {
		flowId,
		previousJob,
		hasFlowId,
		hasPreviousJob
	}
}
