import { useRunAJobStore } from '../store'

export function useSubmit() {
	const [jobDefinitionForRequestBody] = useRunAJobStore(store => [store.jobDefinitionForRequestBody])

	return { jobDefinitionForRequestBody }
}
