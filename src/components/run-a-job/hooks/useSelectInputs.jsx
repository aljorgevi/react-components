import { useRunAJobStore } from '../store'

export function useSelectInputs() {
	const [
		inputNodesInFlow,
		body,
		setJobDefinitionForRequestBody,
		inputCategories, // TODO: the keys in the inputs array is the key in the input nodes of the flow. TODO: we need to 100% confirm the key is the same as datasetKey
		optionalInputs,
		supportInputs,
		inputsCounts
	] = useRunAJobStore(state => [
		state.inputNodesInFlow,
		state.jobDefinitionForRequestBody,
		state.setJobDefinitionForRequestBody,
		state.inputCategories,
		state.optionalInputs,
		state.supportInputs,
		state.inputsCounts
	])
	const { inputs } = body

	const { optionalCategories, requiredCategories } = inputCategories

	function onInputChange({ datasetKey, inputId }) {
		setJobDefinitionForRequestBody({
			...body,
			inputs: {
				...inputs,
				[datasetKey]: inputId
			}
		})
	}

	return { inputNodesInFlow, selectedInputsInJobDefinition: inputs, onInputChange, inputCategories }
}
