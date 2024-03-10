import { useLocation } from 'react-router-dom'

export function useQueryChecker() {
	const { search } = useLocation()
	const queryParams = new URLSearchParams(search)

	const flowId = queryParams.get('flowId')
	const previousJob = queryParams.get('previousJob')
	const policyId = queryParams.get('policyId')

	console.log(policyId)

	return {
		flowId,
		previousJob,
		policyId
	}
}
