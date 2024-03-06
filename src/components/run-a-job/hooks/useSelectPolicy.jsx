import { useRunAJobStore } from '../store'

export const useSelectPolicy = () => {
	const [selectedPolicy, setSelectedPolicy] = useRunAJobStore(state => [state.selectedPolicy, state.setSelectedPolicy])

	const updateLocalStorage = (checked, value) => {
		localStorage.setItem('policy', JSON.stringify({ checked, value }))
	}

	const onPolicyChange = id => {
		setSelectedPolicy({ checked: selectedPolicy.checked, value: id })

		updateLocalStorage(selectedPolicy.checked, id)
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
