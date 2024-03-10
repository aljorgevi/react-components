import { useRunAJobStore } from '../store'
import { useSetQueryParams } from './useSetQueryParams'

export const useSelectPolicy = () => {
	const { setQueryParams } = useSetQueryParams()
	const [selectedPolicy, setSelectedPolicy] = useRunAJobStore(state => [state.selectedPolicy, state.setSelectedPolicy])

	const updateLocalStorage = (checked, value) => {
		localStorage.setItem('policy', JSON.stringify({ checked, value }))
	}

	const onPolicyChange = id => {
		setSelectedPolicy({ checked: selectedPolicy.checked, value: id })

		updateLocalStorage(selectedPolicy.checked, id)
		setQueryParams({ policyId: id })
	}

	const onCheckedChange = event => {
		const { checked } = event.target
		setSelectedPolicy({ checked, value: selectedPolicy.value })

		updateLocalStorage(checked, selectedPolicy.value)
	}

	return {
		selectedPolicy,
		onPolicyChange,
		onCheckedChange
	}
}
