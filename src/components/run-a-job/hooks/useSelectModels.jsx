import { useRunAJobStore } from '../store'

export const useSelectModels = () => {
	const [modelNodesInFlow, body, setJobDefinitionForRequestBody] = useRunAJobStore(state => [
		state.modelNodesInFlow,
		state.jobDefinitionForRequestBody,
		state.setJobDefinitionForRequestBody
	])
	const { models } = body

	function onModelChange({ modelclass, modelId }) {
		setJobDefinitionForRequestBody({
			...body,
			models: {
				...models,
				[modelclass]: modelId
			}
		})
	}

	return { modelNodesInFlow, selectedModelsInJobDefinition: models, onModelChange }
}
